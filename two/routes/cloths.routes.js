import express from "express";
import Cloth from "../models/cloths.model.js";

const router = express.Router();



// Retrieve all cloth items
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const cloths = await Cloth.find().skip(skip).limit(limit);
    const total = await Cloth.countDocuments();

    res.status(200).json({
      cloths,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cloth = await Cloth.findById(id);
    if (!cloth) {
      return res.status(404).json({ error: "Cloth not found" });
    }
    res.status(200).json(cloth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;