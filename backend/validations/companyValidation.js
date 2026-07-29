import { body, validationResult } from "express-validator";

// ==============================
// Create Company Validation
// ==============================

export const companyValidation = [
  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be between 2 and 100 characters"),

  body("companyEmail")
    .trim()
    .notEmpty()
    .withMessage("Company email is required")
    .isEmail()
    .withMessage("Please enter a valid company email"),

  body("website")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Please enter a valid website URL"),

  body("location")
    .optional({ checkFalsy: true })
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("industry")
    .optional({ checkFalsy: true })
    .isLength({ max: 100 })
    .withMessage("Industry cannot exceed 100 characters"),

  body("description")
    .optional({ checkFalsy: true })
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
];

// ==============================
// Update Company Validation
// ==============================

export const updateCompanyValidation = [
  body("companyName")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be between 2 and 100 characters"),

  body("companyEmail")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please enter a valid company email"),

  body("website")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Please enter a valid website URL"),

  body("location")
    .optional({ checkFalsy: true })
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("industry")
    .optional({ checkFalsy: true })
    .isLength({ max: 100 })
    .withMessage("Industry cannot exceed 100 characters"),

  body("description")
    .optional({ checkFalsy: true })
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
];

// ==============================
// Validation Middleware
// ==============================

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