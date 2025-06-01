import { Router } from 'express';
import {
  getAllPedidos,
  getPedidoByFolio,
  createPedido,
  updatePedido,
  deletePedido
} from '../controllers/pedidos.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { pedidoSchema, pedidoUpdateSchema } from '../schemas/pedidos.schema';

const router = Router();

router.get('/', getAllPedidos);
router.get('/:folio', getPedidoByFolio);
router.post('/', validateSchema(pedidoSchema), createPedido);
router.put('/:folio', validateSchema(pedidoUpdateSchema), updatePedido);
router.delete('/:folio', deletePedido);

export default router;
