"use client";
import { useState } from "react";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-black ring-1 ring-line">
        <span className="block h-3.5 w-3.5 rotate-45 bg-accent" />
      </span>
      <span className="text-sm font-bold tracking-tight">
        OPERADOR<span className="text-accent">MX</span>
      </span>
    </div>
  );
}

export default function Landing() {
  const [trucks, setTrucks] = useState(40);
  const lossPerTruckYear = 28000; // pérdida promedio anual por robo/incidente prorrateado (demo)
  const recovered = Math.round(trucks * lossPerTruckYear * 0.6);
  const cost = trucks * 4800; // licencia anual por unidad (demo)
  const roi = Math.round(((recovered - cost) / cost) * 100);

  return (
    <main className="mx-auto max-w-6xl px-5">
      {/* Nav */}
      <nav className="flex items-center justify-between py-5">
        <Logo />
        <div className="hidden gap-6 text-sm text-neutral-400 md:flex">
          <a href="#problema" className="hover:text-white">El problema</a>
          <a href="#como" className="hover:text-white">Cómo funciona</a>
          <a href="#roi" className="hover:text-white">ROI</a>
        </div>
        <a href="#demo" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:brightness-110">
          Solicitar demo
        </a>
      </nav>

      {/* Hero */}
      <section className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-block rounded-full border border-line px-3 py-1 text-xs text-neutral-400">
            Seguridad en ruta · México
          </span>
          <h1 className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            TU RUTA<br /><span className="text-accent">SEGURA</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-neutral-300">
            Tus operadores foráneos viajan vigilados en tiempo real. Botón de auxilio,
            alertas de comunidad y bitácora que aguanta sin señal en la 57.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#demo" className="rounded-lg bg-accent px-5 py-3 font-semibold text-black hover:brightness-110">
              Solicitar demo
            </a>
            <Link href="/dashboard" className="rounded-lg border border-line px-5 py-3 font-semibold hover:bg-surface">
              Ver dashboard
            </Link>
          </div>
          <div className="mt-6 flex gap-3 text-xs text-neutral-500">
            <Link href="/operador" className="underline-offset-2 hover:text-accent hover:underline">Vista operadora →</Link>
            <Link href="/paradero" className="underline-offset-2 hover:text-accent hover:underline">Panel paradero →</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-carbon p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-neutral-500">Flotilla en vivo</span>
            <span className="flex items-center gap-1.5 text-xs text-safe"><i className="pulse block h-2 w-2 rounded-full bg-safe" />4 activas</span>
          </div>
          <div className="mt-4 space-y-2.5">
            {[
              ["MX-4471", "QRO → SLP", "alto"],
              ["MX-2210", "MTY → NLD", "medio"],
              ["MX-1056", "GDL → CDMX", "bajo"],
            ].map(([id, r, lvl]) => (
              <div key={id} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2.5 text-sm">
                <span className="font-medium">{id}</span>
                <span className="text-neutral-400">{r}</span>
                <RiskTag level={lvl as string} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problema */}
      <section id="problema" className="border-t border-line py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">El problema</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            ["Carr. 57 y 85", "Corredores donde el operador foráneo viaja solo y sin respaldo cuando algo pasa."],
            ["Sin señal = sin datos", "Cuando se cae la red, se pierde la última ubicación y la bitácora del viaje."],
            ["Robo a carga", "El incidente se reporta tarde, cuando la unidad ya está parada y nadie supo a tiempo."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-line bg-carbon p-5">
              <h3 className="text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-neutral-400">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como" className="border-t border-line py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">Cómo funciona</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            ["01", "El operador maneja", "Abre la app, ve su ruta y los puntos de riesgo. La bitácora se guarda aunque pierda señal."],
            ["02", "Tú lo ves todo", "La jefa de logística monitorea la flotilla, recibe alertas y autoriza rutas desde el dashboard."],
            ["03", "La comunidad avisa", "Un reporte de riesgo de un operador alerta al resto en la misma ruta. Esa es la red."],
          ].map(([n, t, d]) => (
            <li key={n} className="rounded-xl border border-line bg-carbon p-5">
              <span className="text-2xl font-extrabold text-accent">{n}</span>
              <h3 className="mt-2 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-neutral-400">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonio */}
      <section className="border-t border-line py-16">
        <figure className="rounded-2xl border border-line bg-gradient-to-br from-carbon to-[#0A2440] p-8 md:p-12">
          <blockquote className="text-2xl font-semibold leading-snug md:text-3xl">
            “En seis meses dejé de perder unidades en la 57. Cuando un chofer marca riesgo,
            los demás lo saben antes de llegar. Para mí eso ya pagó la herramienta.”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-accent font-bold text-black">JR</span>
            <span>
              <span className="block font-semibold">Juan Reséndiz</span>
              <span className="block text-sm text-neutral-400">Dueño de 85 camiones · Nuevo León</span>
            </span>
          </figcaption>
        </figure>
      </section>

      {/* ROI */}
      <section id="roi" className="border-t border-line py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">Calcula tu ROI</h2>
        <div className="mt-6 grid gap-8 rounded-2xl border border-line bg-carbon p-6 md:grid-cols-2 md:p-8">
          <div>
            <label className="text-sm text-neutral-400">¿Cuántas unidades tienes?</label>
            <div className="mt-3 text-5xl font-extrabold text-accent">{trucks}</div>
            <input
              type="range" min={5} max={300} value={trucks}
              onChange={(e) => setTrucks(Number(e.target.value))}
              className="mt-4 w-full accent-[#FF6A00]"
            />
            <div className="mt-1 flex justify-between text-xs text-neutral-500"><span>5</span><span>300</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 self-center">
            <Stat label="Pérdida evitada / año" value={`$${recovered.toLocaleString("es-MX")}`} />
            <Stat label="Costo de licencia / año" value={`$${cost.toLocaleString("es-MX")}`} />
            <div className="col-span-2 rounded-xl bg-accent p-5 text-black">
              <span className="text-sm font-medium">Retorno estimado</span>
              <div className="text-4xl font-extrabold">{roi}%</div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-neutral-600">*Cifras ilustrativas para el demo.</p>
      </section>

      {/* CTA */}
      <section id="demo" className="border-t border-line py-20 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight">Pon a tus operadores en el mapa.</h2>
        <p className="mx-auto mt-3 max-w-md text-neutral-400">
          Piloto gratis. Te activamos la flotilla en una semana.
        </p>
        <a href="mailto:hola@operadormx.com" className="mt-7 inline-block rounded-lg bg-accent px-7 py-3.5 font-semibold text-black hover:brightness-110">
          Solicitar demo
        </a>
      </section>

      <footer className="flex flex-col items-center gap-2 border-t border-line py-8 text-xs text-neutral-600">
        <Logo />
        <span>© {new Date().getFullYear()} OperadorMX · Tu ruta segura</span>
      </footer>
    </main>
  );
}

function RiskTag({ level }: { level: string }) {
  const map: Record<string, string> = {
    alto: "bg-danger/15 text-danger",
    medio: "bg-accent/15 text-accent",
    bajo: "bg-safe/15 text-safe",
  };
  return <span className={`rounded px-2 py-0.5 text-xs font-medium ${map[level]}`}>{level}</span>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}
