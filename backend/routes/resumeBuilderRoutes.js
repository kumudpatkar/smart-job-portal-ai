import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  saveResume,
  getResume,
} from "../controllers/resumeBuilderController.js";

const router = express.Router();

// Save Resume
router.post(
  "/save",
  protect,
  saveResume
);

// Get Resume
router.get(
  "/me",
  protect,
  getResume
);

export default router;