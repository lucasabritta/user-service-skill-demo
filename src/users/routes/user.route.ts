import { Router } from 'express';
import { createUser, listUsers, deleteUser } from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', listUsers);
router.delete('/', deleteUser);

export { router as userRouter };
