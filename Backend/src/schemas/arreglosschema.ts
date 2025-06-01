import { z } from 'zod';

export const arregloSchema = z.object({
  descripcion: z.string().min(1),
  tipo_arreglo: z.enum(['1', '2', '3', '4']),
  estatus: z.enum(['1', '2'])
});

export const arregloUpdateSchema = z.object({
  descripcion: z.string().min(1).optional(),
  tipo_arreglo: z.enum(['1', '2', '3', '4']).optional(),
  estatus: z.enum(['1', '2']).optional()
});
