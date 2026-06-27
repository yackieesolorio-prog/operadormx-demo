"use client";
import { RISK_POINTS } from "@/lib/data";

// Mapa autosuficiente para el demo (no requiere token).
// PRODUCCIÓN: sustituir por Mapbox GL — ver nota al pie del README.
export default function RiskMap({ height = 320 }: { height?: number }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-line bg-[#0E0E0E]" style={{ height }}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M6 0H0V6" fill="none" stroke="#1c1c1c" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="60" fill="url(#grid)" />
        {/* corredor seguro */}
        <polyline points="6,54 28,40 46,30 64,22 90,8" fill="none" stroke="#1FBF75" strokeWidth="0.8" opacity="0.5" />
        {/* ruta activa (Carr. 57) */}
        <polyline className="flowline" points="6,54 28,40 46,30 64,22 90,8" fill="none" stroke="#FF6A00" strokeWidth="1.1" />
      </svg>
      {RISK_POINTS.map((p, i) => (
        <div
          key={i}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
        >
          <span className="block h-3 w-3 rounded-full bg-danger ring-4 ring-danger/20" />
          <span className="pointer-events-none absolute left-4 top-0 hidden whitespace-nowrap rounded bg-black/90 px-2 py-1 text-[11px] text-white group-hover:block">
            {p.label}
          </span>
        </div>
      ))}
      <div className="absolute bottom-2 left-2 flex gap-3 rounded-lg bg-black/60 px-3 py-1.5 text-[11px]">
        <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-accent" />Ruta activa</span>
        <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-danger" />Punto de riesgo</span>
        <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-safe" />Corredor seguro</span>
      </div>
    </div>
  );
}
