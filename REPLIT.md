# OperadorMX — Correr y desplegar SIN Node.js local (iMac 2008)

Tu iMac no ejecuta Node, y no hace falta: **toda la compilación corre en la nube**. Tu equipo solo abre un navegador.

> **Realidad de tu hardware:** el *editor* web de Replit es pesado para 2 GB de RAM. El cómputo (instalar, compilar, servir) sí corre en la nube y va a funcionar; lo que puede ir lento es la *interfaz del editor* en tu iMac. Mitigaciones abajo.

## Mitigaciones para el editor lento
- Usa **Chrome o Firefox** actualizados (evita un Safari muy viejo). Si tu macOS no los actualiza, considera editar desde **un celular/tablet** (Replit tiene app) y dejar el iMac solo para *ver* el demo desplegado.
- Cierra todas las demás pestañas. Una sola pestaña con Replit.
- Para **presentar el demo**, no uses el editor: abre la **URL pública desplegada** (carga ligera).

## 1. Crear el proyecto en Replit
1. Entra a replit.com y crea cuenta gratis.
2. **Create Repl** → opción más simple: importar desde GitHub.
   - Sube primero este proyecto a un repo de GitHub (puedes hacerlo desde la web de GitHub, arrastrando los archivos del zip).
   - En Replit: **Create Repl → Import from GitHub** → pega la URL del repo.
   - Si no usas GitHub: **Create Repl → "Next.js"** (template) y copia/pega los archivos.

## 2. Instalar dependencias (en la nube, no en tu Mac)
En el panel **Shell** de Replit:
```bash
npm install
```
Replit lo instala en sus servidores. Tu iMac no instala nada.

## 3. Secrets (variables de entorno)
En Replit → **Tools → Secrets**, agrega:
- `NEXT_PUBLIC_SUPABASE_URL` = (tu URL de Supabase)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (tu anon key)
- `NEXT_PUBLIC_MAPBOX_TOKEN` = (tu token Mapbox, cuando pases el mapa a Mapbox real)

## 4. Correr el servidor de desarrollo (en la nube)
En el Shell:
```bash
npm run dev
```
Replit abre un **Webview** con la URL pública. Ábrela también en tu celular:
`/` · `/operador` · `/dashboard` · `/paradero`.

## 5. Base de datos (Supabase, 100% navegador)
1. supabase.com → New project (gratis).
2. **SQL Editor** → pega y ejecuta `supabase/schema.sql`, luego `supabase/seed.sql`.
3. **Project Settings → API** → copia URL y anon key a los Secrets del paso 3.

## 6. Desplegar (la URL que enseñas al cliente)
**Opción A — Vercel (recomendada para el sitio Next.js):**
```bash
npm i -g vercel
vercel          # login + enlazar (todo en la nube)
vercel --prod   # → https://operadormx.vercel.app
```
O más fácil: en vercel.com **Import Project** desde tu repo de GitHub; agrega los mismos Secrets en *Environment Variables*; deploy automático.

**Opción B — Deploy integrado de Replit:** botón **Deploy** del Repl → te da una URL `*.replit.app`.

## App móvil (Expo) en el navegador
La app React Native/Expo vive en un **Repl aparte** (template Expo). En su Shell: `npm install` y `npx expo start --web` para verla en navegador. Para APK real: `eas build -p android --profile preview` (corre en la nube de Expo, no en tu Mac).
