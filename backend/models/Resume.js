import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      default: "",
    },

    extractedText: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    skills: [String],

    education: [
      {
        degree: String,
        institution: String,
        gpa: String,
        years: String,
        coursework: [String],
      },
    ],

    experience: [
      {
        title: String,
        company: String,
        dates: String,
        description: [String],
      },
    ],

    projects: [
      {
        name: String,
        technologies: String,
        year: String,
        description: [String],
      },
    ],

    certifications: [String],

    missingSkills: [String],

    suggestions: [String],

    analyzedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);