import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  recruiterDashboard,
  adminDashboard,
  jobSeekerDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

/*
==========================================
Job Seeker Dashboard
GET /api/dashboard/jobseeker
==========================================
*/

router.get(
  "/jobseeker",
  protect,
  jobSeekerDashboard
);

/*
==========================================
Recruiter Dashboard
GET /api/dashboard/recruiter
==========================================
*/

router.get(
  "/recruiter",
  protect,
  recruiterDashboard
);

/*
==========================================
Admin Dashboard
GET /api/dashboard/admin
==========================================
*/

router.get(
  "/admin",
  protect,
  adminDashboard
);

export default router;