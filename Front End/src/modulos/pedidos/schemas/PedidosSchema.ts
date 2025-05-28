import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const PedidosSchema = toTypedSchema(
  zod
    .object({
      folio: zod
        .number({ message: "requerido" })
        .int()
        .positive({ message: "un entero positivo" }),
      ID_Cliente: zod
        .number({ message: "requerido" })
        .int()
        .positive({ message: "un entero positivo" }),
      ID_Arreglo: zod
        .number({ message: "requerido" })
        .int()
        .positive({ message: "un entero positivo" }),
      descripcion: zod
        .string()
        .min(1, { message: "mínimo 1 caracter" })
        .max(200, { message: "máximo 200 caracteres" }),
      fecha_hora_pedido: zod
        .string()
        .min(1, { message: "fecha y hora del pedido requerida" }),
      fecha_hora_entrega: zod
        .string()
        .min(1, { message: "fecha y hora de entrega requerida" }),
      precio_sugerido: zod
        .number({ message: "precio sugerido requerido" })
        .positive({ message: "debe ser un número positivo" }),
      ID_personal: zod
        .number({ message: "ID del personal requerido" })
        .int()
        .positive({ message: "un entero positivo" }),
      entregado: zod
        .number({ message: "estatus de entrega requerido" })
        .int()
        .min(1, { message: "mínimo 1" })
        .max(2, { message: "máximo 2" }),
      pagado: zod
        .number({ message: "estatus de pago requerido" })
        .int()
        .min(1, { message: "mínimo 1" })
        .max(2, { message: "máximo 2" }),
    })
    .or(
      zod.object({
        ID_Cliente: zod
          .number({ message: "requerido" })
          .int()
          .positive({ message: "un entero positivo" }),
        ID_Arreglo: zod
          .number({ message: "requerido" })
          .int()
          .positive({ message: "un entero positivo" }),
        descripcion: zod
          .string()
          .min(1, { message: "mínimo 1 caracter" })
          .max(200, { message: "máximo 200 caracteres" }),
        fecha_hora_pedido: zod
          .string()
          .min(1, { message: "fecha y hora del pedido requerida" }),
        fecha_hora_entrega: zod
          .string()
          .min(1, { message: "fecha y hora de entrega requerida" }),
        precio_sugerido: zod
          .number({ message: "precio sugerido requerido" })
          .positive({ message: "debe ser un número positivo" }),
        ID_personal: zod
          .number({ message: "ID del personal requerido" })
          .int()
          .positive({ message: "un entero positivo" }),
        entregado: zod
          .number({ message: "estatus de entrega requerido" })
          .int()
          .min(1, { message: "mínimo 1" })
          .max(2, { message: "máximo 2" }),
        pagado: zod
          .number({ message: "estatus de pago requerido" })
          .int()
          .min(1, { message: "mínimo 1" })
          .max(2, { message: "máximo 2" }),
      })
    )
);
