-- OperadorMX — Datos de ejemplo (ficticios pero realistas)
-- Ejecutar DESPUÉS de schema.sql

-- ── Operadores ─────────────────────────────────────────────────
insert into operadores (nombre, unidad, puntos) values
  ('María Solís', 'MX-4471', 620),
  ('Jorge Lemus', 'MX-2210', 1340),
  ('Pedro Anaya', 'MX-8830', 280),
  ('Lucía Tovar', 'MX-1056', 900);

-- ── Paraderos (corredor Carr. 57 y 85) ─────────────────────────
insert into paraderos (nombre, estado, carretera, km, lat, lng) values
  ('Paradero El Mezquite', 'San Luis Potosí', 'Carr. 57', 120, 22.15, -100.97),
  ('Truck Center Los Pinos', 'Querétaro',      'Carr. 57', 42,  20.72, -100.44),
  ('Paradero La Frontera',  'Nuevo León',      'Carr. 85', 210, 27.49, -99.74);

-- ── Servicios canjeables ───────────────────────────────────────
insert into servicios_paradero (paradero_id, nombre, costo_puntos)
select id, x.nombre, x.costo
from paraderos
cross join (values
  ('Baño + café', 500),
  ('Regaderas 20 min', 800),
  ('Comida corrida', 1200),
  ('Estacionamiento vigilado (noche)', 1500)
) as x(nombre, costo);

-- ── Alertas colaborativas ──────────────────────────────────────
insert into alertas (tipo, carretera, km, lat, lng, nivel, descripcion) values
  ('robo',      'Carr. 57', 142, 22.40, -100.85, 'alto',  'Robo a unidad reportado 3 veces esta semana'),
  ('sin_senal', 'Carr. 57', 88,  21.60, -100.60, 'alto',  'Zona sin cobertura ~6 km'),
  ('reten',     'Carr. 85', 175, 26.90, -99.90,  'medio', 'Retén informal cerca de caseta'),
  ('accidente', 'Carr. 15', 60,  20.95, -103.10, 'medio', 'Volcadura, carril derecho cerrado'),
  ('clima',     'Carr. 40D',95,  25.50, -100.30, 'bajo',  'Neblina densa, baja visibilidad');

-- ── Tipos de unidad + checklist específico ─────────────────────
insert into tipos_unidad (nombre, checklist) values
  ('Tractocamión 3 ejes', '["Presión de llantas (incl. refacción)","Luces y direccionales","Frenos de aire y fugas","Quinta rueda y perno rey","Espejos y limpiaparabrisas","Extintor vigente","Cadenas y tensores de carga","Documentación (carta porte, póliza)"]'::jsonb),
  ('Torton', '["Presión de llantas","Luces","Nivel de aceite y refrigerante","Lona y amarres","Extintor","Botiquín","Documentación"]'::jsonb),
  ('Rabón', '["Presión de llantas","Luces","Frenos","Puertas de caja","Extintor","Documentación"]'::jsonb);

-- ── Canje de ejemplo (ya canjeado, para historial del paradero) ─
insert into canjes (codigo, operador_id, servicio_id, paradero_id, costo_puntos, estado, canjeado_at, validado_por)
select 'PRD-7X4K', o.id, s.id, s.paradero_id, s.costo_puntos, 'canjeado', now() - interval '2 hours', 'Paradero El Mezquite'
from operadores o, servicios_paradero s
where o.unidad = 'MX-4471' and s.nombre = 'Baño + café'
limit 1;
