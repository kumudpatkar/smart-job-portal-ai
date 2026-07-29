import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import {
  uploadProfileImage,
} from "../controllers/profileImageController.js";

const router = express.Router();

router.put(
  "/upload",
  protect,
  upload.single("image"),
  uploadProfileImage
);

export default router;