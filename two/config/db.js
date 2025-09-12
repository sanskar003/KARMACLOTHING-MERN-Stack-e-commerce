import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected;

const connectDB = async () => {
  if (isConnected) {
    console.log("♻️ Using existing MongoDB connection");
    return;
  }

  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is undefined! Check your .env file.");

    const db = await mongoose.connect(uri);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected Successfully!");
    console.log("Connected to DB:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
};

export default connectDB;