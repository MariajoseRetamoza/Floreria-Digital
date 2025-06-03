import { z } from 'zod';

export const pedidoSchema = z.object({
  ID_Cliente: z.number(),
  ID_Arreglo: z.number(),
  descripcion: z.string().min(1),
  fecha_hora_pedido: z.string().datetime(),
  fecha_hora_entrega: z.string().datetime(),
  precio_sugerido: z.number(),
  ID_personal: z.number(),
  entregado: z.enum(['1', '2']),
  pagado: z.enum(['1', '2'])
});

export const pedidoUpdateSchema = z.object({
  ID_Cliente: z.number().optional(),
  ID_Arreglo: z.number().optional(),
  descripcion: z.string().min(1).optional(),
  fecha_hora_pedido: z.string().datetime().optional(),
  fecha_hora_entrega: z.string().datetime().optional(),
  precio_sugerido: z.number().optional(),
  ID_personal: z.number().optional(),
  entregado: z.enum(['1', '2']).optional(),
  pagado: z.enum(['1', '2']).optional()
});
