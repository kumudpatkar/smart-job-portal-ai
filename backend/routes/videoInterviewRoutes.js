import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
evaluateInterview
}
from "../controllers/videoInterviewController.js";

const router = express.Router();

router.post(
"/evaluate",
protect,
evaluateInterview
);

export default router;