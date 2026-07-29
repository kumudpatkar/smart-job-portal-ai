import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getSkillGap } from "../controllers/skillGapController.js";

const router = express.Router();

// =========================================
// Skill Gap Analyzer
// =========================================
router.post(
  "/analyze",
  protect,
  getSkillGap
);

export default router;