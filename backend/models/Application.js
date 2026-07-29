import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    resume: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      default: "",
    },

    status:{
    type:String,
    enum:[
        "Applied",
        "Reviewed",
        "Shortlisted",
        "Interview",
        "Accepted",
        "Rejected"
    ],
    default:"Applied"
},
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications
applicationSchema.index(
  {
    applicant: 1,
    job: 1,
  },
  {
    unique: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;