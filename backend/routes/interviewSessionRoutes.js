import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
nextQuestion
}
from "../controllers/interviewSessionController.js";

const router=express.Router();

router.post(
"/next",
protect,
nextQuestion
);

export default router;