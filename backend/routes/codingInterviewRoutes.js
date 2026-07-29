import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

  getCodingQuestion,

  evaluateCode,

} from "../controllers/codingInterviewController.js";

const router = express.Router();

// Generate Coding Question

router.post(

  "/question",

  protect,

  getCodingQuestion

);

// Evaluate Code

router.post(

  "/evaluate",

  protect,

  evaluateCode

);

export default router;