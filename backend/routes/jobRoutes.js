import express from "express";

import { matchJob } from "../controllers/jobMatchController.js";
import { generateJobCoverLetter } from "../controllers/coverLetterController.js";
import { getInterviewQuestions } from "../controllers/interviewController.js";

import protect from "../middleware/authMiddleware.js";

import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

import {
  jobValidation,
  updateJobValidation,
  validate,
} from "../validations/jobValidation.js";

const router = express.Router();

// Create Job
router.post(
  "/create",
  protect,
  jobValidation,
  validate,
  createJob
);

// Get All Jobs
router.get("/", getJobs);

// Get Single Job
router.get("/:id", getJobById);

// Update Job
router.put(
  "/update/:id",
  protect,
  updateJobValidation,
  validate,
  updateJob
);

// Delete Job
router.delete(
  "/delete/:id",
  protect,
  deleteJob
);

// Match Job
router.get(
  "/match/:id",
  protect,
  matchJob
);

// =========================================
// AI Cover Letter Generator
// =========================================
router.post(
  "/:id/cover-letter",
  protect,
  generateJobCoverLetter
);

// =========================================
// AI Interview Questions Generator
// =========================================
router.post(
  "/:id/interview-questions",
  protect,
  getInterviewQuestions
);

export default router;