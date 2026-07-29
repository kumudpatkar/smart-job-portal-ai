import express from "express";
import protect from "../middleware/authMiddleware.js";
import { chatWithAssistant } from "../controllers/careerAssistantController.js";

const router = express.Router();

// =========================================
// AI Career Assistant Chat
// =========================================
router.post(
  "/chat",
  protect,
  chatWithAssistant
);

export default router;