import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getCareerRoadmap } from "../controllers/careerRoadmapController.js";

const router = express.Router();

// =========================================
// AI Career Roadmap
// =========================================
router.post(
  "/generate",
  protect,
  getCareerRoadmap
);

export default router;