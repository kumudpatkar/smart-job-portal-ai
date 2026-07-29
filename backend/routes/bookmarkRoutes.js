import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  saveJob,
  getBookmarks,
  removeBookmark,
  checkBookmark,
} from "../controllers/bookmarkController.js";

const router = express.Router();

// =========================================
// Save Job
// POST /api/bookmarks/:jobId
// =========================================
router.post(
  "/:jobId",
  protect,
  saveJob
);

// =========================================
// Get My Bookmarks
// GET /api/bookmarks
// =========================================
router.get(
  "/",
  protect,
  getBookmarks
);

// =========================================
// Check Bookmark
// GET /api/bookmarks/check/:jobId
// =========================================
router.get(
  "/check/:jobId",
  protect,
  checkBookmark
);

// =========================================
// Remove Bookmark
// DELETE /api/bookmarks/:jobId
// =========================================
router.delete(
  "/:jobId",
  protect,
  removeBookmark
);

export default router;