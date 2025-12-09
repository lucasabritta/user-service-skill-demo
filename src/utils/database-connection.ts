import mongoose from 'mongoose';
import { logger } from './log-service';

export async function connectDatabase() {
    const uri = process.env.MONGO_URI || 'mongodb://host.docker.internal:27017/mydb';

    await mongoose.connect(uri);

    logger.info('Connected to MongoDB');
}
