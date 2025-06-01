import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send('Listar pedidos'));
router.post('/', (req, res) => res.send('Crear pedido'));
router.put('/:id', (req, res) => res.send(`Actualizar pedido con ID ${req.params.id}`));
router.delete('/:id', (req, res) => res.send(`Borrar pedido con ID ${req.params.id}`));

export default router;
