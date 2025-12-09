import mongoose from 'mongoose';

export async function connectDatabase() {
    const uri = process.env.MONGO_URI || 'mongodb://host.docker.internal:27017/mydb';

    await mongoose.connect(uri);

    console.log('Connected to MongoDB');
}
