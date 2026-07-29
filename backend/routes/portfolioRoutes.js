import express from "express";
import protect from "../middleware/authMiddleware.js";
import { portfolioGeneratorController } from "../controllers/portfolioController.js";

const router = express.Router();

/*
==========================================
AI Portfolio Generator
POST /api/portfolio-generator
==========================================
*/

router.post(
  "/",
  protect,
  portfolioGeneratorController
);

export default router;