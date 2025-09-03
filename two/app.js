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

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//connect to mongodb
connectDB();

//use routes
app.use("/auth", authRoutes);
app.use("/api/personal-info", personalInfoRoutes)
app.use("/api/cloths/search", searchRoutes)
app.use("/api/cloths", clothRoutes);
app.use("/productImages", express.static('productImages'));
app.use("/uploads", express.static('uploads'));


//Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
