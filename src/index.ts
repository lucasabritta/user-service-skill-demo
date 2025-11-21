import express, { Request, Response } from 'express';
import { SortOrder } from 'mongoose';
import { User } from '../database/models/users';
import cors from 'cors';

const app = express();
app.use(cors()).use(express.json()).options('*', cors());

app.post('/users', async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email } = req.body;

  if (!name) {
    return res.status(400).send({ error: 'The attribute "name" is required' });
  }

  if (!email) {
    return res.status(400).send({ error: 'The attribute "email" is required' });
  }

  try {
    const user = await User.create({ name, email });
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get('/users', async (req: Request, res: Response) => {
  console.log(req.query);

  const created = req.query.created;
  let sortValue: SortOrder = 1; // Default order

  if (created !== undefined) {
    if (created !== 'asc' && created !== 'desc') {
      return res.status(400).send({ error: 'created must be "asc" or "desc"' });
    }
    sortValue = created === 'asc' ? 1 : -1;
  }

  try {
    const users = await User.find().sort({ createdAt: sortValue });
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export { app };
