    import mongoose from "mongoose";
    import dns from "dns";
    import dotenv from 'dotenv'

    dns.setServers([
        '1.1.1.1',
        '8.8.8.8'
    ])

    dotenv.config()

    const connectDB = async () => {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env");
        }

        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 10000,
            });
            console.log(`Connected to MongoDB: ${conn.connection.host}`);
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        }
    }

    export default connectDB;

