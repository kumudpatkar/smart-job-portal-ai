import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
      },
    ],

    salary: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      default: "",
    },

    skills: [
  {
    type: String,
  },
],

industry: {
  type: String,
  default: "",
},

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
      default: "Full-Time",
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;