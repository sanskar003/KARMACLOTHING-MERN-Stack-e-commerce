import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import clothRoutes from "./routes/cloths.routes.js";
import authRoutes from "./routes/auth.routes.js";
import personalInfoRoutes from "./routes/personalInfo.routes.js";
import searchRoutes from "./routes/search.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allow both local dev and production frontend
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL // e.g., https://your-frontend.vercel.app
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/api/personal-info", personalInfoRoutes);
app.use("/api/cloths/search", searchRoutes);
app.use("/api/cloths", clothRoutes);
app.use("/productImages", express.static("productImages"));
app.use("/uploads", express.static("uploads"));

// Export the app for Vercel serverless
export default app;