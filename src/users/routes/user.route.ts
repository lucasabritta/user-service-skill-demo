import { Router } from 'express';
import { createUser, listUsers, deleteUser, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', listUsers);
router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser);

export { router as userRouter };
