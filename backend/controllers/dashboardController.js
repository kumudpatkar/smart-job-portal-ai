import User from "../models/User.js";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import Resume from "../models/Resume.js";
import InterviewHistory from "../models/InterviewHistory.js";
import Bookmark from "../models/Bookmark.js";

// =====================================================
// Recruiter Dashboard
// =====================================================
export const recruiterDashboard = async (req, res) => {
  try {

    const totalCompanies = await Company.countDocuments({
      owner: req.user._id,
    });

    const totalJobs = await Job.countDocuments({
      createdBy: req.user._id,
    });

    const recruiterJobs = await Job.find({
      createdBy: req.user._id,
    }).select("_id");

    const jobIds = recruiterJobs.map((job) => job._id);

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const recentJobs = await Job.find({
      createdBy: req.user._id,
    })
      .populate("company")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentApplications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("applicant", "fullName email profilePhoto")
      .populate("job", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalCompanies,
        totalJobs,
        totalApplications,
        recentJobs,
        recentApplications,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =====================================================
// Admin Dashboard
// =====================================================
export const adminDashboard = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments({
      role: "jobseeker",
    });

    const totalRecruiters = await User.countDocuments({
      role: "recruiter",
    });

    const totalCompanies = await Company.countDocuments();

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentCompanies = await Company.find()
      .populate("owner", "fullName email")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentJobs = await Job.find()
      .populate("company")
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalRecruiters,
        totalCompanies,
        totalJobs,
        totalApplications,
        recentUsers,
        recentCompanies,
        recentJobs,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =====================================================
// Job Seeker Dashboard
// =====================================================
export const jobSeekerDashboard = async (req, res) => {

  try {

    const applications = await Application.countDocuments({
      applicant: req.user._id,
    });

    const savedJobs = await Bookmark.countDocuments({
      user: req.user._id,
    });

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    const interviews = await InterviewHistory.find({
      user: req.user._id,
    });

    let interviewScore = 0;

    if (interviews.length > 0) {

      interviewScore = Math.round(

        interviews.reduce(
          (sum, item) => sum + item.overallScore,
          0
        ) / interviews.length

      );

    }

    res.status(200).json({

      success: true,

      dashboard: {

        applications,

        savedJobs,

        atsScore: resume?.atsScore || 0,

        resumeCompletion: resume?.completion || 80,

        interviewScore,

        profileViews: 125,

        shortlisted: 4,

        rejected: 1,

      },

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};