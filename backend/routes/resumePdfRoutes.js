import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  downloadResumePDF,
} from "../controllers/resumePdfController.js";

const router = express.Router();

// ======================================
// Download Resume PDF
// ======================================

router.get(
  "/download",
  protect,
  downloadResumePDF
);

export default router;