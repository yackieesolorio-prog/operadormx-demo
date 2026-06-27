# OperadorMX — Demo (Next.js)

4 superficies en un solo proyecto:
- `/` — Web empresarial (cierra al dueño)
- `/operador` — Vista de la operadora foránea (móvil / PWA)
- `/dashboard` — Jefa de logística
- `/paradero` — Panel de canje de puntos

Marca: negro `#0A0A0A`, acento naranja `#FF6A00`, tipografía Inter. Sin dependencias de red para el demo (mapa autosuficiente).

## Correr en 10 min

```bash
cd operadormx-demo
npm install        # ~2 min
npm run dev        # http://localhost:3000
```

Abre:
- http://localhost:3000 (landing)
- http://localhost:3000/operador
- http://localhost:3000/dashboard
- http://localhost:3000/paradero

Para verlo en tu celular en la misma red: `npm run dev -- -H 0.0.0.0` y entra a `http://TU_IP_LOCAL:3000/operador`.

## Deploy a Vercel (lo que pediste como "link deployado")

No puedo desplegarlo por ti (requiere tu cuenta). Es un comando:

```bash
npm i -g vercel
vercel            # primera vez: login + enlazar proyecto
vercel --prod     # genera la URL pública: https://operadormx-demo.vercel.app
```

O sube el repo a GitHub e importa en vercel.com → "New Project" → deploy automático.

## La operadora en el celular (en vez de APK)

Para un demo, una URL pesa menos que un APK: el cliente abre `/operador` en el navegador y "Agregar a inicio" lo deja como app (PWA). Cero instalación, cero signing.

Si necesitas APK real (build de producción Expo, fuera de este proyecto):

```bash
npm i -g eas-cli
eas build -p android --profile preview   # genera el .apk en tu cuenta Expo
```

Eso vive en tu app React Native de producción, no en este demo web.

## Pasar el mapa a Mapbox real (producción)

`components/RiskMap.tsx` es un SVG autosuficiente para que el demo corra sin token. En producción, sustituye su contenido por `mapbox-gl` y alimenta las rutas/puntos desde el Orchestrator. Pon el token en `.env.local` como `NEXT_PUBLIC_MAPBOX_TOKEN`.

## Conectar al backend real

Los datos están en `lib/data.ts`. Cambia cada arreglo por `fetch` al API NestJS / Socket.IO `/operadormx`. La forma de los objetos ya coincide con las pantallas.
