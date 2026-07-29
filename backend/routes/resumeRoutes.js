import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  uploadResume,
  getResume,
  deleteResume,
} from "../controllers/resumeController.js";

import { getResumeAnalytics } from "../controllers/resumeAnalyticsController.js";

const router = express.Router();

// =========================================
// Resume Dashboard Analytics
// =========================================
router.get(
  "/dashboard",
  protect,
  getResumeAnalytics
);

// =========================================
// Upload / Update Resume
// =========================================
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

// =========================================
// Get Resume
// =========================================
router.get(
  "/",
  protect,
  getResume
);

// =========================================
// Delete Resume
// =========================================
router.delete(
  "/",
  protect,
  deleteResume
);

export default router;