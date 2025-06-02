import { z } from 'zod';

export const personalSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  direccion: z.string().min(1, 'La dirección es requerida'),
  telefono: z.string().min(10, 'El teléfono es inválido'),
  estatus: z.enum(['1', '2'])
});
