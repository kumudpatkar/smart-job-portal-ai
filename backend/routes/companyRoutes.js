import express from "express";

import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  companyValidation,
  updateCompanyValidation,
  validate,
} from "../validations/companyValidation.js";

const router = express.Router();

// Create Company
router.post(
  "/create",
  protect,
  upload.single("logo"),
  companyValidation,
  validate,
  createCompany
);

// Get All Companies of Logged-in Recruiter
router.get("/my-companies", protect, getCompanies);

// Get Company By ID
router.get("/:id", protect, getCompanyById);

// Update Company
router.put(
  "/update/:id",
  protect,
  upload.single("logo"),
  updateCompanyValidation,
  validate,
  updateCompany
);

// Delete Company
router.delete("/delete/:id", protect, deleteCompany);

export default router;