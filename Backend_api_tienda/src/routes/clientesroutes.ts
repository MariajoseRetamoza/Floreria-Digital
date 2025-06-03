import { Router } from 'express';
import {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/clientescontroller';
import { validateSchema } from '../middlewares/validateSchema';
import { clienteSchema, clienteUpdateSchema } from '../schemas/clientesschema';

const router = Router();

router.get('/', getAllClientes);
router.get('/:id', getClienteById);
router.post('/', validateSchema(clienteSchema), createCliente);
router.put('/:id', validateSchema(clienteUpdateSchema), updateCliente);
router.delete('/:id', deleteCliente);

export default router;
