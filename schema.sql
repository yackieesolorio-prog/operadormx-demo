-- OperadorMX — Esquema Supabase (Postgres)
-- Ejecutar en Supabase → SQL Editor. Idempotente para el demo.

create extension if not exists pgcrypto;

-- ── Operadores (mínimo para BETA) ──────────────────────────────
create table if not exists operadores (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  unidad text,
  puntos int not null default 0,
  created_at timestamptz default now()
);

-- ── Paraderos ──────────────────────────────────────────────────
create table if not exists paraderos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  estado text,
  carretera text,
  km numeric,
  lat double precision,
  lng double precision,
  activo boolean default true,
  created_at timestamptz default now()
);

-- ── Servicios canjeables por puntos ────────────────────────────
create table if not exists servicios_paradero (
  id uuid primary key default gen_random_uuid(),
  paradero_id uuid references paraderos(id) on delete cascade,
  nombre text not null,          -- "Baño + café"
  costo_puntos int not null,     -- 500
  disponible boolean default true
);

-- ── Ledger de puntos (auditable) ───────────────────────────────
create table if not exists puntos_movimientos (
  id uuid primary key default gen_random_uuid(),
  operador_id uuid references operadores(id) on delete cascade,
  delta int not null,            -- +80 reporte, -500 canje
  motivo text not null,          -- 'reporte_riesgo' | 'canje' | 'viaje_sin_incidente' | 'uso_diario'
  ref text,
  created_at timestamptz default now()
);

-- ── Canjes con código QR único PRD- ────────────────────────────
create table if not exists canjes (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,   -- 'PRD-7X4K'
  operador_id uuid references operadores(id),
  servicio_id uuid references servicios_paradero(id),
  paradero_id uuid references paraderos(id),
  costo_puntos int not null,
  estado text not null default 'emitido', -- emitido | canjeado | expirado | cancelado
  emitido_at timestamptz default now(),
  expira_at timestamptz default now() + interval '24 hours',
  canjeado_at timestamptz,
  validado_por text
);
create index if not exists canjes_estado_idx on canjes (estado);

-- ── Alertas colaborativas ──────────────────────────────────────
create table if not exists alertas (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,            -- 'robo' | 'reten' | 'sin_senal' | 'accidente' | 'clima'
  carretera text,
  km numeric,
  lat double precision,
  lng double precision,
  nivel text not null default 'medio', -- alto | medio | bajo
  descripcion text,
  reportado_por uuid references operadores(id),
  created_at timestamptz default now()
);

-- ── Tipos de unidad + checklist ────────────────────────────────
create table if not exists tipos_unidad (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,          -- 'Tractocamión 3 ejes'
  checklist jsonb not null       -- ["Llantas y presión", "Luces", ...]
);

-- ════════════════════════════════════════════════════════════════
-- FUNCIÓN: emitir canje (descuenta puntos + genera QR único, atómico)
-- ════════════════════════════════════════════════════════════════
create or replace function emitir_canje(p_operador uuid, p_servicio uuid)
returns canjes language plpgsql as $$
declare
  v_costo int;
  v_paradero uuid;
  v_saldo int;
  v_codigo text;
  v_row canjes;
begin
  select costo_puntos, paradero_id into v_costo, v_paradero
    from servicios_paradero where id = p_servicio and disponible = true;
  if v_costo is null then raise exception 'SERVICIO_NO_DISPONIBLE'; end if;

  -- bloquea la fila del operador para evitar doble gasto concurrente
  select puntos into v_saldo from operadores where id = p_operador for update;
  if v_saldo is null then raise exception 'OPERADOR_NO_EXISTE'; end if;
  if v_saldo < v_costo then raise exception 'PUNTOS_INSUFICIENTES'; end if;

  update operadores set puntos = puntos - v_costo where id = p_operador;
  insert into puntos_movimientos(operador_id, delta, motivo, ref)
    values (p_operador, -v_costo, 'canje', null);

  -- genera código único PRD-XXXX con reintento ante colisión
  loop
    v_codigo := 'PRD-' || upper(substr(encode(gen_random_bytes(3), 'hex'), 1, 4));
    begin
      insert into canjes(codigo, operador_id, servicio_id, paradero_id, costo_puntos)
        values (v_codigo, p_operador, p_servicio, v_paradero, v_costo)
        returning * into v_row;
      exit;
    exception when unique_violation then
      -- reintenta con otro código
    end;
  end loop;

  update puntos_movimientos set ref = v_codigo
    where operador_id = p_operador and motivo = 'canje' and ref is null;
  return v_row;
end $$;

-- ════════════════════════════════════════════════════════════════
-- FUNCIÓN: validar canje en el paradero (un solo uso, a prueba de carrera)
-- ════════════════════════════════════════════════════════════════
create or replace function validar_canje(p_codigo text, p_validador text)
returns canjes language plpgsql as $$
declare v_row canjes;
begin
  -- el WHERE estado='emitido' garantiza que solo UN update gane bajo concurrencia
  update canjes
     set estado = 'canjeado', canjeado_at = now(), validado_por = p_validador
   where codigo = upper(p_codigo)
     and estado = 'emitido'
     and expira_at > now()
   returning * into v_row;

  if v_row.id is null then
    if not exists (select 1 from canjes where codigo = upper(p_codigo)) then
      raise exception 'CODIGO_INEXISTENTE';
    elsif exists (select 1 from canjes where codigo = upper(p_codigo) and estado = 'canjeado') then
      raise exception 'YA_CANJEADO';
    else
      raise exception 'EXPIRADO';
    end if;
  end if;
  return v_row;
end $$;
