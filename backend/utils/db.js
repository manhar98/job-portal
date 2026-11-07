import mongoose from "mongoose";

const DEFAULT_MONGO_URI = "mongodb+srv://manharzapdiya9898_db_user:Mjz%409898@cluster0.zy2qkre.mongodb.net/jobportal?retryWrites=true&w=majority";
const DIRECT_MONGO_URI = "mongodb://manharzapdiya9898_db_user:Mjz%409898@ac-uh6uqt7-shard-00-00.zy2qkre.mongodb.net:27017,ac-uh6uqt7-shard-00-01.zy2qkre.mongodb.net:27017,ac-uh6uqt7-shard-00-02.zy2qkre.mongodb.net:27017/jobportal?ssl=true&replicaSet=atlas-uh6uqt-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
    const connUri = process.env.MONGO_URI || DEFAULT_MONGO_URI;
    try {
        await mongoose.connect(connUri, { serverSelectionTimeoutMS: 5000 });
        console.log("MongoDB connected successfully!");
        return;
    } catch (error) {
        console.error("Primary MongoDB connection error:", error.message);
    }

    // Try direct replica set if SRV DNS lookup failed
    try {
        console.log("Attempting direct MongoDB Atlas replica set connection...");
        await mongoose.connect(DIRECT_MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("MongoDB connected successfully via Direct Replica Set!");
        return;
    } catch (directErr) {
        console.error("Direct MongoDB Atlas connection error:", directErr.message);
    }

    // Local fallback
    try {
        console.log("Attempting local MongoDB connection...");
        await mongoose.connect("mongodb://127.0.0.1:27017/jobportal", { serverSelectionTimeoutMS: 2000 });
        console.log("MongoDB connected successfully to Local MongoDB!");
    } catch (localErr) {
        console.error("Local MongoDB fallback failed:", localErr.message);
    }
};

export default connectDB;
