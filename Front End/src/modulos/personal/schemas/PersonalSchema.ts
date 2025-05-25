import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const PersonalSchema = toTypedSchema(
  zod
    .object({
      id: zod
        .number({ message: "requerido" })
        .int()
        .positive({ message: "un entero positivo" }),
      nombre: zod
        .string()
        .min(1, { message: "mínimo 3 caracteres" })
        .max(200, { message: "maximo 200 caracteres" }),
      direccion: zod
        .string()
        .min(1, { message: "direccion requerida" })
        .max(200, { message: "maximo 200 caracteres" }),
      telefono: zod
        .string()
        .min(10, { message: "minimo 10 numeros" })
        .max(15, { message: "maximo 15 numeros" }),
      estatus: zod
        .number({ message: "estatus requerido" })
        .min(1, { message: "mínimo valor 1" })
        .max(2, { message: "máximo valor 2" }),
    })
    .or(
      zod.object({
        nombre: zod
          .string()
          .min(1, { message: "mínimo 3 caracteres" })
          .max(200, { message: "maximo 200 caracteres" }),
        direccion: zod
          .string()
          .min(1, { message: "direccion requerida" })
          .max(200, { message: "maximo 200 caracteres" }),
        telefono: zod
          .string()
          .min(10, { message: "minimo 10 numeros" })
          .max(15, { message: "maximo 15 numeros" }),
        estatus: zod
          .number({ message: "estatus requerido" })
          .min(1, { message: "mínimo valor 1" })
          .max(2, { message: "máximo valor 2" }),
      })
    )
);
