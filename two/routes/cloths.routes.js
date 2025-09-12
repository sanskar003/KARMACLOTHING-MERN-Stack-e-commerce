import express from "express";
import mongoose from "mongoose";
import Cloth from "../models/cloths.model.js";

const router = express.Router();


// ✅ Get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Cloth.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get cloths with filters
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { category, tags, rating, sort } = req.query;
    

    let filter = {};

    if (category) {
      filter.category = new RegExp(`^${category}$`, "i");
    }
    if (tags) {
      const tagArray = tags.split(",");
      filter.tags = { $in: tagArray.map(tag => new RegExp(`^${tag}$`, "i")) };
    }
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    let sortOption = {};
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "rating_desc") sortOption.rating = -1;

    const cloths = await Cloth.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Cloth.countDocuments(filter);

    res.status(200).json({
      cloths,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get single cloth by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

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