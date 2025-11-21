import express, { Request, Response } from 'express';
import { User } from '../database/models/users';
import cors from 'cors';

const app = express();
app.use(cors()).use(express.json()).options('*', cors());

app.post('/users', async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).send(user);
});

app.get('/users', async (req: Request, res: Response) => {
  const users = await User.find().sort({ createdAt: 1 });
  res.status(200).send(users);
});

export { app };
