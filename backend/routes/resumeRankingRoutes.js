import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  rankSingleResume,
  rankAllResumes,
} from "../controllers/resumeRankingController.js";

const router = express.Router();

/*
POST
/api/resume-ranking
*/

router.post(
  "/",
  protect,
  rankSingleResume
);

/*
GET
/api/resume-ranking/job/:jobId
*/

router.get(
  "/job/:jobId",
  protect,
  rankAllResumes
);

export default router;