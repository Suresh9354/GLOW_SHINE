import express from "express";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const router = express.Router();

// Configure Cloudinary conditionally
const isCloudinaryConfigured = 
  process.env.CLOUDINARY_URL || (
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET
  );

if (process.env.CLOUDINARY_URL) {
  // Cloudinary SDK automatically configures itself when CLOUDINARY_URL is present,
  // but we can call config() to verify or let it handle it natively.
} else if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Configure storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File validation filter
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (.jpg, .jpeg, .png, .webp) are allowed!"));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// POST /api/upload
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  }

  // Clean path format (convert backslashes to forward slashes for Windows compatibility)
  const cleanLocalPath = `/${req.file.path.replace(/\\/g, "/")}`;

  if (isCloudinaryConfigured) {
    try {
      // Upload local temp file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "glow_shine",
      });

      // Delete the local temp file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting local temp file:", err);
      });

      // Return the secure Cloudinary URL
      return res.status(201).json({
        message: "Image uploaded to Cloudinary successfully",
        imagePath: result.secure_url,
      });
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      // Delete local temp file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting local temp file:", err);
      });
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }
  }

  // Fallback to local storage response if Cloudinary is not configured
  res.status(201).json({
    message: "Image uploaded locally successfully",
    imagePath: cleanLocalPath, // e.g. "/uploads/image-123456.jpg"
  });
});

export default router;
