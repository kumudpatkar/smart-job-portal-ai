import mongoose from "mongoose";

const interviewHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  technicalScore: {
    type: Number,
    default: 0,
  },

  communicationScore: {
    type: Number,
    default: 0,
  },

  confidenceScore: {
    type: Number,
    default: 0,
  },

  overallScore: {
    type: Number,
    default: 0,
  },

  strengths: [
    {
      type: String,
    },
  ],

  improvements: [
    {
      type: String,
    },
  ],

  feedback: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InterviewHistory = mongoose.model(
  "InterviewHistory",
  interviewHistorySchema
);

export default InterviewHistory;