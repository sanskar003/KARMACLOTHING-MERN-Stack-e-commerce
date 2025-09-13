// middleware/uploads.js
import multer from "multer";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

const uploads = multer({
  storage: multer.memoryStorage(), // keep file in memory
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WebP images are allowed"));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2 MB limit
});

export default uploads;