import { body, validationResult } from "express-validator";

// ======================================
// Create Job Validation
// ======================================

export const jobValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Job title must be between 2 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Job description is required")
    .isLength({ min: 20 })
    .withMessage("Description should be at least 20 characters"),

  body("salary")
    .notEmpty()
    .withMessage("Salary is required")
    .isNumeric()
    .withMessage("Salary must be a number"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("experience")
    .optional({ checkFalsy: true })
    .trim(),

  body("jobType")
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(["Full-Time", "Part-Time", "Internship", "Remote"])
    .withMessage("Invalid job type"),

  body("vacancies")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Vacancies must be at least 1"),

  body("company")
    .notEmpty()
    .withMessage("Company ID is required")
    .isMongoId()
    .withMessage("Invalid Company ID"),

  body("requirements")
    .optional()
    .isArray()
    .withMessage("Requirements must be an array"),
];

// ======================================
// Update Job Validation
// ======================================

export const updateJobValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Job title must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 20 })
    .withMessage("Description should be at least 20 characters"),

  body("salary")
    .optional()
    .isNumeric()
    .withMessage("Salary must be a number"),

  body("location")
    .optional()
    .trim(),

  body("experience")
    .optional()
    .trim(),

  body("jobType")
    .optional()
    .isIn(["Full-Time", "Part-Time", "Internship", "Remote"])
    .withMessage("Invalid job type"),

  body("vacancies")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Vacancies must be at least 1"),

  body("company")
    .optional()
    .isMongoId()
    .withMessage("Invalid Company ID"),

  body("requirements")
    .optional()
    .isArray()
    .withMessage("Requirements must be an array"),
];

// ======================================
// Validation Result Middleware
// ======================================

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};