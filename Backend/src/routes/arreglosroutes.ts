import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send('Listar arreglos'));
router.post('/', (req, res) => res.send('Crear arreglo'));
router.put('/:id', (req, res) => res.send(`Actualizar arreglo con ID ${req.params.id}`));
router.delete('/:id', (req, res) => res.send(`Borrar arreglo con ID ${req.params.id}`));

export default router;
