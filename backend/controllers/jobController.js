import APIFeatures from "../utils/apiFeatures.js";
import Job from "../models/Job.js";

// =========================================
// Create Job
// =========================================
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      jobType,
      vacancies,
      company,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      jobType,
      vacancies,
      company,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// ========================================
// Get All Jobs (Search + Filter + Sort + Pagination)
// ========================================
export const getJobs = async (req, res) => {
  try {
    const resultPerPage = 10;

    const apiFeatures = new APIFeatures(
      Job.find().populate("company").populate("createdBy", "fullName email"),
      req.query
    )
      .search()
      .filter()
      .sort()
      .pagination(resultPerPage);

    const jobs = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: jobs.length,
      resultPerPage,
      jobs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// =========================================
// Get Single Job
// =========================================
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company")
      .populate("createdBy", "fullName email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Update Job
// =========================================
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized",
      });
    }

    job.title = req.body.title || job.title;
    job.description = req.body.description || job.description;
    job.requirements = req.body.requirements || job.requirements;
    job.salary = req.body.salary || job.salary;
    job.location = req.body.location || job.location;
    job.experience = req.body.experience || job.experience;
    job.jobType = req.body.jobType || job.jobType;
    job.vacancies = req.body.vacancies || job.vacancies;
    job.company = req.body.company || job.company;

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Delete Job
// =========================================
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};