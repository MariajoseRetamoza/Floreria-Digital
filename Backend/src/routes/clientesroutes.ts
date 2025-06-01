import { Router } from 'express';
import {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/clientes.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { clienteSchema, clienteUpdateSchema } from '../schemas/clientes.schema';

const router = Router();

router.get('/', getAllClientes);
router.get('/:id', getClienteById);
router.post('/', validateSchema(clienteSchema), createCliente);
router.put('/:id', validateSchema(clienteUpdateSchema), updateCliente);
router.delete('/:id', deleteCliente);

export default router;
