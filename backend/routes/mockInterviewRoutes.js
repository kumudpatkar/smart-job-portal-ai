import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
continueInterview
} from "../controllers/mockInterviewController.js";

const router = express.Router();

router.post(
"/",
protect,
continueInterview
);

export default router;