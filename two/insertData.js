import fs from "fs";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Cloth from "./models/cloths.model.js";

const insertData = async () => {
 try {
    await connectDB();
    const jsonData = JSON.parse(fs.readFileSync("clothsData.json", "utf-8"));

    if (!Array.isArray(jsonData)) {
      throw new Error("Invalid data format. Expected an array.");
    }

    for (const item of jsonData) {
      await Cloth.updateOne(
        { name: item.name }, // find by name (or SKU in production)
        { $set: item },      // update fields, including images
        { upsert: true }     // insert if it doesn't exist
      );
      console.log(`Upserted: ${item.name}`);
    }

    console.log("Bulk upsert completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting/updating data:", error);
  }

};

insertData();