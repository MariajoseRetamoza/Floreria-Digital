//validaciones con Zod - Construir schema

import { z } from "zod";

export const pedidosSchema = z
  .object({
    ID_Cliente: z.number().int().positive(),
    ID_Arreglo: z.number().int().positive(),
    descripcion: z.string().min(1).max(200).optional(),
    fecha_hora_pedido: z.string(),
    fecha_hora_entrega: z.string(),
    precio_sugerido: z.number().positive(),
    ID_personal: z.number().int().positive(),
    entregado: z.number().int().min(1).max(2),
    pagado: z.number().int().min(1).max(2),
  })
  .or(
    z.object({
      folio: z.number().int().positive(),
    })
  )
  .refine(
    (data) => {
      // Si no tiene las fechas, entonces pasa (no valida fechas)
      if (!("fecha_hora_entrega" in data) || !("fecha_hora_pedido" in data)) {
        return true;
      }
      // Si las tiene, valida que entrega >= pedido
      return (
        new Date(data.fecha_hora_entrega!) >= new Date(data.fecha_hora_pedido!)
      );
    },
    {
      message:
        "La fecha de entrega no puede ser anterior a la fecha del pedido",
      path: ["fecha_hora_entrega"],
    }
  );
