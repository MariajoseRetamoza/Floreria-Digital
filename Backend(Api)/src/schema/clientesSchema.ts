import { z } from "zod";

const telefonoRegEx = new RegExp(
    /^([+]?[\s0-9]+)?(\s{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const NombreRegEx = new RegExp(
    /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/
);

export const clientesSchema = z.object({
    nombre: z.string()
        .min(2, "Minimo 2 caracteres")
        .max(200, "Maximo 200 caracteres")
        .regex(NombreRegEx, "Solo letras y espacios"),

    direccion: z.string()
        .min(10, "Minimo 10 caracteres")
        .max(300, "Maximo 300 caracteres")
        .refine(val => val.trim().length > 0, { message: "No puede ser solo espacios" }),

    telefono:z.string().regex(telefonoRegEx),
  });

