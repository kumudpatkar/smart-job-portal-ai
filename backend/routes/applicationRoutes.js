import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  applyJob,
  myApplications,
  getApplicationsByJob,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// ======================================
// Apply for a Job
// POST /api/applications/apply/:jobId
// ======================================
router.post(
  "/apply/:jobId",
  protect,
  upload.single("resume"),
  applyJob
);

// ======================================
// Logged-in User Applications
// GET /api/applications/me
// ======================================
router.get(
  "/me",
  protect,
  myApplications
);

// ======================================
// Recruiter View Applications by Job
// GET /api/applications/job/:jobId
// ======================================
router.get(
  "/job/:jobId",
  protect,
  getApplicationsByJob
);

// ======================================
// Update Application Status
// PUT /api/applications/status/:id
// ======================================
router.put(
  "/status/:id",
  protect,
  updateApplicationStatus
);

// ======================================
// Delete (Withdraw) Application
// DELETE /api/applications/:id
// ======================================
router.delete(
  "/:id",
  protect,
  deleteApplication
);

export default router;