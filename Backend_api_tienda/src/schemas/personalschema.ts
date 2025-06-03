import { z } from 'zod';

export const personalSchema = z.object({
  nombre: z.string().min(1),
  direccion: z.string().min(1),
  telefono: z.string().min(10).max(15),
  estatus: z.enum(['1', '2'])
});

export const personalUpdateSchema = z.object({
  nombre: z.string().min(1).optional(),
  direccion: z.string().min(1).optional(),
  telefono: z.string().min(10).max(15).optional(),
  estatus: z.enum(['1', '2']).optional()
});
