import { z } from 'zod';

export const clienteSchema = z.object({
  nombre_completo: z.string().min(1),
  direccion: z.string().min(1),
  telefono: z.string().min(10).max(15)
});

export const clienteUpdateSchema = z.object({
  nombre_completo: z.string().min(1).optional(),
  direccion: z.string().min(1).optional(),
  telefono: z.string().min(10).max(15).optional()
});
