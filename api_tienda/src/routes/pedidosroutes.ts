import { Router } from 'express';
import {
  getAllPedidos,
  getPedidoByFolio,
  createPedido,
  updatePedido,
  deletePedido
} from '../controllers/pedidoscontroller';
import { validateSchema } from '../middlewares/validateSchema';
import { pedidoSchema, pedidoUpdateSchema } from '../schemas/pedidosschema';

const router = Router();

router.get('/', getAllPedidos);
router.get('/:folio', getPedidoByFolio);
router.post('/', validateSchema(pedidoSchema), createPedido);
router.put('/:folio', validateSchema(pedidoUpdateSchema), updatePedido);
router.delete('/:folio', deletePedido);

export default router;
