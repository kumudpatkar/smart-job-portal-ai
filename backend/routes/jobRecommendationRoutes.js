import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getRecommendedJobs } from "../controllers/jobRecommendationController.js";

const router = express.Router();

/*
==================================================
AI Job Recommendation
GET /api/job-recommendation
==================================================
*/

router.get("/", protect, getRecommendedJobs);

export default router;