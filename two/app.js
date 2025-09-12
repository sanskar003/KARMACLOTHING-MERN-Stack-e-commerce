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

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error("Not allowed by CORS"));
  },
  credentials: true
}));


// Connect to MongoDB
console.log("🔌 Attempting MongoDB connection...");
await connectDB();  
console.log("✅ DB connection complete, starting routes...");


// Routes
app.get("/", async (req, res) => {
  console.log("📥 Incoming request to /");
  try {
    const data = await Cloth.find({});
    console.log("📦 Found docs:", data.length);
    res.json(data);
  } catch (err) {
    console.error("❌ Error in / route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.use("/auth", authRoutes);
app.use("/api/personal-info", personalInfoRoutes);
app.use("/api/cloths/search", searchRoutes);
app.use("/api/cloths", clothRoutes);

app.use("/productImages", express.static("productImages"));
app.use("/uploads", express.static("uploads"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;