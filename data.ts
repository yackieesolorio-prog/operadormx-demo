// Datos simulados del demo. Reemplazar por API real (NestJS Orchestrator) en producción.

export const FLEET = [
  { id: "MX-4471", driver: "María Solís", route: "QRO → SLP (57)", status: "en_ruta", risk: "alto", speed: 88, lastSeen: "hace 12 s", checklist: true },
  { id: "MX-2210", driver: "Jorge Lemus", route: "MTY → NLD (85)", status: "en_ruta", risk: "medio", speed: 92, lastSeen: "hace 8 s", checklist: true },
  { id: "MX-8830", driver: "Pedro Anaya", route: "CDMX → QRO (57)", status: "parada", risk: "bajo", speed: 0, lastSeen: "hace 1 m", checklist: false },
  { id: "MX-1056", driver: "Lucía Tovar", route: "GDL → CDMX (15)", status: "en_ruta", risk: "bajo", speed: 79, lastSeen: "hace 5 s", checklist: true },
  { id: "MX-6642", driver: "Hugo Reyes", route: "SLP → MTY (57)", status: "sin_senal", risk: "alto", speed: null, lastSeen: "hace 6 m", checklist: true },
];

export const ALERTS = [
  { id: "A-901", unit: "MX-4471", type: "Punto de riesgo reportado", where: "Km 142, Carr. 57 (San Luis)", time: "hace 3 m", level: "alto" },
  { id: "A-902", unit: "MX-6642", type: "Pérdida de señal", where: "Km 88, Carr. 57", time: "hace 6 m", level: "alto" },
  { id: "A-903", unit: "MX-2210", type: "Exceso de horas (NOM-087)", where: "Caseta Sabinas", time: "hace 22 m", level: "medio" },
  { id: "A-904", unit: "MX-8830", type: "Checklist no completado", where: "Patio CDMX", time: "hace 35 m", level: "medio" },
];

export const COST_BY_ROUTE = [
  { route: "Carr. 57 (QRO–SLP–MTY)", trips: 142, costPerTrip: 18450, incidents: 3 },
  { route: "Carr. 85 (MTY–Nuevo Laredo)", trips: 96, costPerTrip: 21300, incidents: 1 },
  { route: "Carr. 15 (GDL–CDMX)", trips: 64, costPerTrip: 14200, incidents: 0 },
];

export const TODAY_REDEMPTIONS = [
  { id: "R-5512", driver: "María Solís", unit: "MX-4471", reward: "Baño + café", points: 500, time: "07:42", code: "PRD-7X4K" },
  { id: "R-5513", driver: "Lucía Tovar", unit: "MX-1056", reward: "Comida corrida", points: 1200, time: "09:15", code: "PRD-2M9Q" },
  { id: "R-5514", driver: "Jorge Lemus", unit: "MX-2210", reward: "Regaderas 20 min", points: 800, time: "10:03", code: "PRD-8B1Z" },
];

export const DRIVER_ROUTES = [
  { id: "RT-01", label: "QRO → San Luis Potosí", via: "Carr. 57", km: 203, eta: "2 h 40 m", risk: "alto" },
  { id: "RT-02", label: "Entrega CEDIS SLP", via: "Anillo Periférico", km: 14, eta: "25 m", risk: "bajo" },
];

export const RISK_POINTS = [
  { x: 0.42, y: 0.30, label: "Km 142 — robo reportado x3" },
  { x: 0.58, y: 0.52, label: "Km 88 — zona sin señal" },
  { x: 0.30, y: 0.66, label: "Caseta — retén informal" },
];
