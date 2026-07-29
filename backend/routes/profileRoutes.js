import express from "express";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import { uploadProfileImage } from "../controllers/profileController.js";

import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

// Get Logged-in User
router.get("/me", protect, getProfile);

// Update Profile
router.put(
  "/update",
  protect,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

router.post(
    "/upload-photo",
    protect,
    upload.single("photo"),
    uploadProfileImage
);


export default router;