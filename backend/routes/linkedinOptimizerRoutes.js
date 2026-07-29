import express from "express";
import { linkedinOptimizerController } from "../controllers/linkedinOptimizerController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/linkedin-optimizer
router.post("/", protect, linkedinOptimizerController);

export default router;