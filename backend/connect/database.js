import mongoose from 'mongoose';

const connectionDb = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    return mongoose.connection.db;
};

export default connectionDb;

