//validaciones con Zod - Construir schema

import { z } from "zod";
const telefonoRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[0-9])+}$/
);

//const nombreRegex = new RegExp(/^[a-z|A-Z{200}]$/);
export const personalSchema = z
  .object({
    nombre: z
      .string()
      .min(2, "Minimo 2 caracteres")
      .max(200, "Maximo 200 caracteres"),
    direccion: z.string().min(2).max(300),
    //telefono: z.string().min(10).max(15),
    telefono: z.string().regex(telefonoRegex),
    estatus: z.number().int().positive(),
    //   .min(1)
    //   .max(2, "Los valores correctos son 1 y 2"),
  })
  .refine((data) => data.direccion === "TEC DE CULIACAN", {
    message: "La direccion debe ser TEC DE CULIACAN",
    path: ["direccion"],
  })
  .refine((data) => data.estatus <= 2, {
    message: "El estatus debe ser 1 o 2",
    path: ["estatus"],
  })
  .or(
    z.object({
      telefono: z.string().min(10).max(15),
    })
  )
  .or(
    z.object({
      id: z.number().int().positive().min(1).max(9999),
    })
  );
