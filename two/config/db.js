import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false; // Track connection state

const connectDB = async () => {
  if (isConnected) {
    console.log("♻️ Using existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is undefined! Check your .env file.");

    // Force the DB name to karmaClothing even if it's missing from the URI
    const db = await mongoose.connect(uri, {
      dbName: "karmaClothing"
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB Connected Successfully!");
    console.log("Connected to DB:", mongoose.connection.db?.databaseName || "Unknown");

    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    throw error; // Fail fast so the route returns 500
  }
};

export default connectDB;