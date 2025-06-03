import { Router } from 'express';
import personalRoutes from './personalroutes';
import clientesRoutes from './clientesroutes';
import pedidosRoutes from './pedidosroutes';
import arreglosRoutes from './arreglosroutes';

const router = Router();

router.use('/personal', personalRoutes);
router.use('/clientes', clientesRoutes);
router.use('/pedidos', pedidosRoutes);
router.use('/arreglos', arreglosRoutes);

export default router;