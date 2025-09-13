import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import uploads from "../middlewares/uploads.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { registerValidator, loginValidator } from "../middlewares/validator.middleware.js";
import { handleValidation } from "../middlewares/validationResult.middleware.js";

dotenv.config();
const router = express.Router();

router.use(cookieParser());

// REGISTER
router.post(
  "/register",
  uploads.single("avatar"),
  registerValidator,
  handleValidation,
  async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      let avatarUrl = null;

      if (req.file) {
        const fileName = `${Date.now()}-${req.file.originalname}`;

        // Upload to Supabase private bucket
        const { error: uploadError } = await supabase
          .storage
          .from("avatars")
          .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype
          });

        if (uploadError) throw uploadError;

        // Create signed URL (valid for 1 year)
        const { data: signedData, error: signedError } = await supabase
          .storage
          .from("avatars")
          .createSignedUrl(fileName, 60 * 60 * 24 * 365);

        if (signedError) throw signedError;

        avatarUrl = signedData.signedUrl;
      }

      const user = new User({
        username,
        email,
        password: hashedPassword,
        avatar: avatarUrl
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 3600000
      });

      res.json({ message: "User Created Successfully", token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);



// LOGIN
router.post(
  "/login",
  loginValidator,
  handleValidation,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Invalid username or password" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 3600000
      });

      res.json({ message: "Logged in successfully", token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PROTECTED ROUTE
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Welcome! Authenticated user!",
    user: req.user,
    data: "This is protected"
  });
});

export default router;