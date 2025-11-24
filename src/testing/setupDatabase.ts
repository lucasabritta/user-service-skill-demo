import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach } from '@jest/globals';

let mongod: MongoMemoryServer;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri, { autoIndex: true });
});

beforeEach(async () => {
    // Clean all collections
    await mongoose.connection.db.dropDatabase();

    // Rebuild indexes
    const models = mongoose.models;
    const modelNames = Object.keys(models);

    for (const name of modelNames) {
        await models[name].syncIndexes();
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongod.stop();
});
