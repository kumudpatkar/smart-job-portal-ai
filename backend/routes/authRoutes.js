import express from "express";

import {
  register,
  login,
} from "../controllers/authController.js";

import {
  registerValidation,
  loginValidation,
  validate,
} from "../validations/authValidation.js";

const router = express.Router();

// Register
router.post(
  "/register",
  registerValidation,
  validate,
  register
);

// Login
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

export default router;