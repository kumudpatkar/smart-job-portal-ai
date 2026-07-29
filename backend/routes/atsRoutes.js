import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  atsChecker,
} from "../controllers/atsController.js";

const router = express.Router();

/*
=========================================
AI ATS Resume Checker
POST /api/ats/check
=========================================
*/

router.post(
  "/check",
  protect,
  atsChecker
);

export default router;