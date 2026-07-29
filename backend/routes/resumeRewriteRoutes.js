import express from "express";
import multer from "multer";
import path from "path";
import protect from "../middleware/authMiddleware.js";
import { rewriteResumeController } from "../controllers/resumeRewriteController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

router.post(
  "/",
  protect,
  upload.single("resume"),
  rewriteResumeController
);

export default router;