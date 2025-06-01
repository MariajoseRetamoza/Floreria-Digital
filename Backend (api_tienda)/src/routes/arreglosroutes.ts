import { Router } from 'express';
import {
  getAllArreglos,
  getArregloById,
  createArreglo,
  updateArreglo,
  deleteArreglo
} from '../controllers/arreglos.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { arregloSchema, arregloUpdateSchema } from '../schemas/arreglos.schema';

const router = Router();

router.get('/', getAllArreglos);
router.get('/:id', getArregloById);
router.post('/', validateSchema(arregloSchema), createArreglo);
router.put('/:id', validateSchema(arregloUpdateSchema), updateArreglo);
router.delete('/:id', deleteArreglo);

export default router;
