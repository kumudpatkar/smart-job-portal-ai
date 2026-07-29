import Company from "../models/Company.js";

// =============================
// Create Company
// =============================
export const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyEmail,
      website,
      location,
      industry,
      description,
    } = req.body;

    // Check duplicate company email
    const existingCompany = await Company.findOne({ companyEmail });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company email already exists",
      });
    }

    const company = await Company.create({
      companyName,
      companyEmail,
      website,
      location,
      industry,
      description,
      owner: req.user._id,
      logo: req.file?.path || "",
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Logged-in Recruiter's Companies
// =============================
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Company By ID
// =============================
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Update Company
// =============================
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    company.companyName = req.body.companyName || company.companyName;
    company.companyEmail = req.body.companyEmail || company.companyEmail;
    company.website = req.body.website || company.website;
    company.location = req.body.location || company.location;
    company.industry = req.body.industry || company.industry;
    company.description = req.body.description || company.description;

    if (req.file) {
      company.logo = req.file.path;
    }

    await company.save();

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Delete Company
// =============================
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    await company.deleteOne();

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};