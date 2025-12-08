import { Router } from 'express';
import { createUser, listUsers, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', listUsers);
router.put('/:userId', updateUser);

export { router as userRouter };
