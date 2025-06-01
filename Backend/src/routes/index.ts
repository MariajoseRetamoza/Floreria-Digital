import { Router } from 'express';
import personalRoutes from './personal.routes';
import clientesRoutes from './clientes.routes';
import pedidosRoutes from './pedidos.routes';
import arreglosRoutes from './arreglos.routes';

const router = Router();

router.use('/personal', personalRoutes);
router.use('/clientes', clientesRoutes);
router.use('/pedidos', pedidosRoutes);
router.use('/arreglos', arreglosRoutes);

export default router;