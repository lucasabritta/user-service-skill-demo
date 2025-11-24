import { Router } from 'express';
import { createUser, listUsers } from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', listUsers);

export { router as userRouter };
