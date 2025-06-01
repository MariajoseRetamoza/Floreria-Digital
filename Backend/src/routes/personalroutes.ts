import { Router } from 'express';
import {
  getAllPersonal,
  getPersonalById,
  createPersonal,
  updatePersonal,
  deletePersonal
} from '../controllers/personal.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { personalSchema, personalUpdateSchema } from '../schemas/personal.schema';

const router = Router();

// GET: Obtener todos los registros del personal
router.get('/', getAllPersonal);

// GET: Obtener un registro del personal por ID
router.get('/:id', getPersonalById);

// POST: Crear nuevo personal (validación Zod incluida)
router.post('/', validateSchema(personalSchema), createPersonal);

// PUT: Modificar personal existente (validación Zod incluida)
router.put('/:id', validateSchema(personalUpdateSchema), updatePersonal);

// DELETE: Baja lógica del personal (estatus=2)
router.delete('/:id', deletePersonal);

export default router;
