import mongoose from "mongoose";
import dns from "dns";

// Ensure DNS resolvers work properly for MongoDB Atlas SRV lookup on Windows
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    console.log("DNS custom resolvers note:", e.message);
}

// MongoDB Database Connection
const connectDB = async () => {
    try {
        const connUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jobportal";
        await mongoose.connect(connUri);
        console.log("MongoDB connected successfully to:", connUri.includes("mongodb+srv") ? "MongoDB Atlas Cloud" : "Local MongoDB");
    } catch (error) {
        console.error("Primary MongoDB connection error:", error.message);
        // Fallback to local MongoDB if cloud connection has network/auth issue
        try {
            console.log("Attempting fallback to local MongoDB (mongodb://127.0.0.1:27017/jobportal)...");
            await mongoose.connect("mongodb://127.0.0.1:27017/jobportal");
            console.log("MongoDB connected successfully to Local MongoDB!");
        } catch (localErr) {
            console.error("Local MongoDB fallback also failed:", localErr.message);
            process.exit(1);
        }
    }
};

export default connectDB;
