import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send('Listar clientes'));
router.post('/', (req, res) => res.send('Crear cliente'));
router.put('/:id', (req, res) => res.send(`Actualizar cliente con ID ${req.params.id}`));
router.delete('/:id', (req, res) => res.send(`Borrar cliente con ID ${req.params.id}`));

export default router;
