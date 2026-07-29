import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

getInterviewHistory

}

from "../controllers/interviewHistoryController.js";

const router=express.Router();

router.get(

"/",

protect,

getInterviewHistory

);

export default router;