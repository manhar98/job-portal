import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./utils/db.js";

// Routes
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import adminRoute from "./routes/admin.route.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder for uploaded files (resumes, logos)
app.use("/uploads", express.static(path.resolve("public/uploads")));

// CORS Configuration
const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "http://127.0.0.1:5173"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true); // Allow during local development
        }
    },
    credentials: true
}));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/admin", adminRoute);

// Health check endpoint
app.get("/api/health", (req, res) => {
    return res.status(200).json({
        message: "Job Portal API is running smoothly!",
        status: "healthy",
        timestamp: new Date()
    });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
