import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generateInterviewReportController } from "../controllers/interviewReportController.js";

const router = express.Router();

/*
========================================================
AI Interview Report
POST /api/interview-report
========================================================
*/

router.post(
  "/",
  protect,
  generateInterviewReportController
);

export default router;