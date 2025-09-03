import express from "express";
import Cloth from "../models/cloths.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = req.query.q;

    let result;
    if (query && query.trim() !== "") {
      result = await Cloth.find({
        name: { $regex: query, $options: "i" },
      });
    } else {
      result = await Cloth.find({});
    }
    res.json(result);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;