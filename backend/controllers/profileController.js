import User from "../models/User.js";

// ==============================
// Get Logged-in User Profile
// ==============================
export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Update Profile
// ==============================
export const updateProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullName = req.body.fullName || user.fullName;
    user.phone = req.body.phone || user.phone;
    user.location = req.body.location || user.location;
    user.education = req.body.education || user.education;
    user.experience = req.body.experience || user.experience;
    user.github = req.body.github || user.github;
    user.linkedin = req.body.linkedin || user.linkedin;
    user.portfolio = req.body.portfolio || user.portfolio;
    user.bio = req.body.bio || user.bio;

    if (req.body.skills) {
      user.skills = Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills.split(",");
    }

    // Avatar Upload
    if (req.files?.avatar) {
      user.avatar = req.files.avatar[0].path;
      user.profileImage = req.files.avatar[0].path;
    }

    // Resume Upload
    if (req.files?.resume) {
      user.resume = req.files.resume[0].path;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Upload Profile Photo
// ==============================
export const uploadProfileImage = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    user.profileImage = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      image: user.profileImage,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
