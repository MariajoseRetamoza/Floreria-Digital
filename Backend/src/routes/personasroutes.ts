import { Router } from 'express';
import { getAllPersonal, createPersonal, updatePersonal, deletePersonal } from '../controllers/personal.controller';

const router = Router();

router.get('/', getAllPersonal);
router.post('/', createPersonal);
router.put('/:id', updatePersonal);
router.delete('/:id', deletePersonal);

export default router;