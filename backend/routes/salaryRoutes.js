import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getSalaryPrediction } from "../controllers/salaryController.js";

const router = express.Router();

// =========================================
// AI Salary Predictor
// =========================================
router.post(
  "/predict",
  protect,
  getSalaryPrediction
);

export default router;