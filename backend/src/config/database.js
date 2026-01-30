const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
    try {
        let mongoURI;

        if (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI) {
            // Use provided MongoDB URI in production
            mongoURI = process.env.MONGODB_URI;
        } else {
            // Use in-memory MongoDB for development
            if (!mongoServer) {
                mongoServer = await MongoMemoryServer.create();
            }
            mongoURI = mongoServer.getUri();
        }

        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected successfully');
        console.log(`📊 Database URI: ${mongoURI}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        if (mongoServer) {
            await mongoServer.stop();
        }
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error('Error disconnecting MongoDB:', error);
    }
};

module.exports = { connectDB, disconnectDB };
