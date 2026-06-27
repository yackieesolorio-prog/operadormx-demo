# OperadorMX — Identidad visual

Estética: **industrial, nocturna, funcional, legible.** Modo oscuro por defecto. El naranja se usa con disciplina: acción, alerta y puntos. Todo lo demás es azul noche.

## A. Logotipo
- `brand/logo.svg` — lockup horizontal (badge + "OperadorMX" + "TU RUTA SEGURA").
- `app/icon.svg` — solo el badge (favicon / ícono de app).

Concepto: la **O** es el horizonte/cabina (anillo); la **M** es una carretera que se bifurca hacia el punto de fuga. Naranja sobre azul noche.
Para entrega final, **convierte el texto a contornos** (en Figma/Illustrator: Type → Outline) para no depender de la fuente.

## B. Paleta (HEX + Tailwind)

| Rol | HEX | Token Tailwind |
|---|---|---|
| Fondo base (noche) | `#07121F` | `bg-ink` |
| Superficie / tarjeta | `#0F2236` | `bg-carbon` |
| Superficie elevada | `#16304A` | `bg-surface` |
| Borde / línea | `#21405E` | `border-line` |
| Azul de marca (primario) | `#2E7BD6` | `text-brand` / `bg-brand` |
| Acento / acción / puntos | `#FF6A00` | `bg-accent` |
| Texto principal | `#EAF1F8` | (default body) |
| Texto secundario | `#7E93AB` | `text-neutral-400` |
| Éxito | `#22C55E` | `text-safe` |
| Peligro / pánico | `#FF453A` | `text-danger` |
| Advertencia | `#F5A623` | `text-warning` |

Config en `tailwind.config.ts` (ya aplicada). Cambiar estos hex reskinea toda la app.

## C. Tipografía
- **Display / títulos:** *Barlow Semi Condensed* (600/700/800) — vibe de señalética carretera. Var: `--font-display`. Se aplica a `h1–h4` vía `globals.css`.
- **Cuerpo / UI:** *Inter* (400/500/600).
- **Datos / códigos:** mono del sistema para códigos QR `PRD-XXXX` (clase `font-mono`).

Escala: H1 56–60 / H2 22 / título tarjeta 18 / cuerpo 15–16 / micro 11–12.

## D. Componentes clave
- **Botón primario:** `bg-accent text-black font-semibold rounded-lg px-5 py-3`.
- **Botón de pánico:** ancho completo, `rounded-2xl py-5 font-extrabold`, naranja en reposo → rojo (`bg-danger text-white`) al activarse, con `.pulse` (anillo expansivo). Respeta `prefers-reduced-motion`.
- **Tarjeta (glassmorphism nocturno):** `bg-carbon/70 backdrop-blur border border-line/60 rounded-xl`.
- **Barra inferior:** 3 pestañas, activa `bg-accent text-black`, inactivas `text-neutral-400`.
- **Mapa:** capa base oscura, ruta activa naranja animada (`.flowline`), puntos de riesgo rojos, corredor seguro verde.
- **Checklist táctil:** ítems numerados, toque marca foto + estado (ok/falla). Pendiente en demo (ver tabla de pendientes).
- **Monedero de puntos:** tarjeta con gradiente naranja, saldo grande, lista de servicios canjeables con costo en puntos.

## E. Modo noche / web
La app y el dashboard ya corren en modo noche por defecto (azul noche). El sitio empresarial usa el mismo sistema. Las "visualizaciones" son las pantallas reales corriendo en `npm run dev` — más útiles que un mockup estático.
