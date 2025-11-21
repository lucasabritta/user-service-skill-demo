import * as dotenv from 'dotenv';
import { app } from '.';
import { connectDB } from './db';

dotenv.config();

async function start() {
  await connectDB();

  const port = process.env.PORT || 3111;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start();
