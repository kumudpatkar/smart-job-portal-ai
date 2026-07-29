import Bookmark from "../models/Bookmark.js";
import Job from "../models/Job.js";

// =========================================
// Save Job
// =========================================
export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check duplicate bookmark
    const existingBookmark = await Bookmark.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existingBookmark) {
      return res.status(400).json({
        success: false,
        message: "Job already bookmarked",
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      job: jobId,
    });

    res.status(201).json({
      success: true,
      message: "Job bookmarked successfully",
      bookmark,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =========================================
// Get My Bookmarks
// =========================================
export const getBookmarks = async (req, res) => {
  try {

    const bookmarks = await Bookmark.find({
      user: req.user._id,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      bookmarks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =========================================
// Remove Bookmark
// =========================================
export const removeBookmark = async (req, res) => {
  try {

    const { jobId } = req.params;

    const bookmark = await Bookmark.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    await bookmark.deleteOne();

    res.status(200).json({
      success: true,
      message: "Bookmark removed successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =========================================
// Check Bookmark
// =========================================
export const checkBookmark = async (req, res) => {
  try {

    const { jobId } = req.params;

    const bookmark = await Bookmark.findOne({
      user: req.user._id,
      job: jobId,
    });

    res.status(200).json({
      success: true,
      bookmarked: !!bookmark,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};