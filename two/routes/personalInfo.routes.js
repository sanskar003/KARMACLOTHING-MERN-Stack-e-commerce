import express from "express";
import User from "../models/user.model.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/address",verifyToken, async (req, res) => {
  try {
    const { street, city, state, zipcode, phone } = req.body.address || {};

    if (!street || !city || !state || !zipcode || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { address: { street, city, state, zipcode, phone } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Address updated successfully",
      address: updatedUser.address,
    });
  } catch (error) {
    console.error("updateuser error:",error)
    res.status(500).json({ message: "Server error while updating address" });
  }
});

export default router;
