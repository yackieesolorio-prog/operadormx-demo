import { supabase } from "./supabase";

const ERRORES: Record<string, string> = {
  SERVICIO_NO_DISPONIBLE: "El servicio no está disponible.",
  OPERADOR_NO_EXISTE: "Operador no encontrado.",
  PUNTOS_INSUFICIENTES: "No tienes puntos suficientes.",
  CODIGO_INEXISTENTE: "Código inválido. Pide al operador su QR en la app.",
  YA_CANJEADO: "Este código ya fue canjeado.",
  EXPIRADO: "El código expiró.",
};
const traducir = (msg: string) =>
  Object.keys(ERRORES).find((k) => msg.includes(k)) ? ERRORES[Object.keys(ERRORES).find((k) => msg.includes(k))!] : msg;

// Operador: emite un canje → recibe { codigo: 'PRD-XXXX', ... } para mostrar como QR
export async function emitirCanje(operadorId: string, servicioId: string) {
  const { data, error } = await supabase.rpc("emitir_canje", {
    p_operador: operadorId,
    p_servicio: servicioId,
  });
  if (error) throw new Error(traducir(error.message));
  return data; // fila de canjes
}

// Paradero: valida y marca el código (un solo uso)
export async function validarCanje(codigo: string, validador: string) {
  const { data, error } = await supabase.rpc("validar_canje", {
    p_codigo: codigo,
    p_validador: validador,
  });
  if (error) throw new Error(traducir(error.message));
  return data;
}

// Canjes de hoy para el panel del paradero
export async function canjesDeHoy(paraderoId: string) {
  const inicio = new Date(); inicio.setHours(0, 0, 0, 0);
  const { data, error } = await supabase
    .from("canjes")
    .select("codigo, costo_puntos, estado, canjeado_at, servicio_id")
    .eq("paradero_id", paraderoId)
    .gte("canjeado_at", inicio.toISOString())
    .order("canjeado_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}
// QR: en el cliente renderiza 'codigo' con la lib 'qrcode'.
