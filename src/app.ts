import express from 'express';
import cors from 'cors';

import { userRouter } from './users/routes/user.route';
import { errorHandler } from './errorHandler';

const app = express();
app.use(cors()).use(express.json()).options('*', cors());

app.use('/users', userRouter);

app.use(errorHandler);

export { app };
