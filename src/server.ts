import * as dotenv from 'dotenv';
import { app } from './app';
import { connectDatabase } from '../infrastructure/database/mongo';


dotenv.config();

async function start() {
  await connectDatabase();

  const port = process.env.PORT || 3111;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start();
