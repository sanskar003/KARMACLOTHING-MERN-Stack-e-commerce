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

    // Force the DB name to the actual current one in Atlas
    const db = await mongoose.connect(uri, {
      dbName: "karmaCothing"
    });

    isConnected = db.connections[0].readyState === 1;

    // Wait until the connection is fully open before logging DB name
    mongoose.connection.once("open", () => {
      console.log("✅ MongoDB Connected Successfully!");
      console.log("Connected to DB:", mongoose.connection.db.databaseName);
    });

    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    throw error; // Fail fast so the route returns 500
  }
};

export default connectDB;