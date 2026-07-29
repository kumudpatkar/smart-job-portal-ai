import express from "express";
import protect from "../middleware/authMiddleware.js";
import { evaluateAnswer } from "../controllers/interviewEvaluationController.js";

const router = express.Router();

// =========================================
// AI Interview Evaluation
// =========================================
router.post(
  "/evaluate",
  protect,
  evaluateAnswer
);

export default router;