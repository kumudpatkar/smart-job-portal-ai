const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  rewriteResume,
} = require("../controllers/rewriteResumeController");

const router = express.Router();

// Upload folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".docx"];

    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"));
    }
  },
});

// POST /api/rewrite-resume
router.post(
  "/rewrite-resume",
  upload.single("resume"),
  rewriteResume
);

module.exports = router;