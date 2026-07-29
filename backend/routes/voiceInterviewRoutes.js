import express from "express";
import protect from "../middleware/authMiddleware.js";
import { evaluateVoiceAnswer } from "../controllers/voiceInterviewController.js";

const router = express.Router();

// =========================================
// Voice Interview Evaluation
// =========================================
router.post(
  "/evaluate",
  protect,
  evaluateVoiceAnswer
);

export default router;