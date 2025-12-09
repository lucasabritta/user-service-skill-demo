import * as dotenv from 'dotenv';
import { app } from './app';
import { connectDatabase } from './utils/database-connection';
import { logger } from './utils/log-service';

dotenv.config();

async function start() {
    await connectDatabase();

    const port = process.env.PORT || 4111;
    app.listen(port, () => {
        logger.info(`Server running at http://localhost:${port}`);
    });
}

void start();
