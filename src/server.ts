import * as dotenv from 'dotenv';
import { app } from '.';

dotenv.config();

const port = process.env.PORT || 3111;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
