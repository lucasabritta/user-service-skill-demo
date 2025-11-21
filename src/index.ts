import express, { Request, Response } from 'express';
import { User } from '../database/models/users';
import cors from 'cors';

const app = express();
app.use(cors()).use(express.json()).options('*', cors());

app.post('/users', async (req: Request, res: Response) => {
  console.log(req.body);
  const name = req.body.name;

  if (!name) {
    return res.status(400).send({ error: 'The attribute "name" is required' });
  }

  const user = await User.create({ name });
  res.status(201).send(user);
});

app.get('/users', async (req: Request, res: Response) => {
  console.log(req.query);
  const users = await User.find().sort({ createdAt: 1 });
  res.status(200).send(users);
});

export { app };
