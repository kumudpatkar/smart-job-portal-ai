import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  getResumeAnalytics,
  getResumeChartAnalytics,
} from "../controllers/resumeAnalyticsController.js";

const router = express.Router();

// =========================================
// Resume Dashboard Analytics
// =========================================
router.get(
  "/",
  protect,
  getResumeAnalytics
);

// =========================================
// Resume Chart Analytics
// =========================================
router.get(
  "/chart",
  protect,
  getResumeChartAnalytics
);

export default router;