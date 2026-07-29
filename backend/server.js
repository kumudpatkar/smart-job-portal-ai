import dns from "dns";

// Force Node.js to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";

import cors from "cors";
import path from "path";


import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import resumeAnalyticsRoutes from "./routes/resumeAnalyticsRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
import skillGapRoutes from "./routes/skillGapRoutes.js";
import careerRoadmapRoutes from "./routes/careerRoadmapRoutes.js";
import careerAssistantRoutes from "./routes/careerAssistantRoutes.js";
import interviewEvaluationRoutes from "./routes/interviewEvaluationRoutes.js";
import voiceInterviewRoutes from "./routes/voiceInterviewRoutes.js";
import jobRecommendationRoutes from "./routes/jobRecommendationRoutes.js";
import mockInterviewRoutes from "./routes/mockInterviewRoutes.js";
import videoInterviewRoutes from "./routes/videoInterviewRoutes.js";
import interviewSessionRoutes from "./routes/interviewSessionRoutes.js";
import interviewHistoryRoutes from "./routes/interviewHistoryRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import resumeBuilderRoutes from "./routes/resumeBuilderRoutes.js";
import resumePdfRoutes from "./routes/resumePdfRoutes.js";
import codingInterviewRoutes from "./routes/codingInterviewRoutes.js";
import resumeRankingRoutes from "./routes/resumeRankingRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import resumeRewriteRoutes from "./routes/resumeRewriteRoutes.js";
import interviewReportRoutes from "./routes/interviewReportRoutes.js";
import linkedinOptimizerRoutes from "./routes/linkedinOptimizerRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import http from "http";
import { initializeSocket } from "./socket/socket.js";
import profileImageRoutes from "./routes/profileImageRoutes.js";

import connectDB from "./config/db.js";


// Connect MongoDB
connectDB();

// Create Express app
const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Auth Routes
app.use("/api/auth", authRoutes);

// Use Company Routes
app.use("/api/companies", companyRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/resume-analytics", resumeAnalyticsRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/career-roadmap", careerRoadmapRoutes);
app.use("/api/career-assistant", careerAssistantRoutes);
app.use("/api/interview-evaluation", interviewEvaluationRoutes);
app.use("/api/voice-interview", voiceInterviewRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/job-recommendation", jobRecommendationRoutes);
app.use("/api/mock-interview", mockInterviewRoutes);
app.use("/api/video-interview", videoInterviewRoutes);
app.use("/api/interview-session", interviewSessionRoutes);
app.use("/api/interview-history", interviewHistoryRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/resume-builder", resumeBuilderRoutes);
app.use("/api/resume-pdf", resumePdfRoutes);
app.use("/api/coding-interview", codingInterviewRoutes);
app.use("/api/resume-ranking", resumeRankingRoutes);
app.use("/api/resume-rewrite", resumeRewriteRoutes);
app.use("/api/interview-report", interviewReportRoutes);
app.use("/api/linkedin-optimizer", linkedinOptimizerRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/profile-image", profileImageRoutes);
// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Smart Job Portal Backend is Running",
  });
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is Healthy ✅",
    timestamp: new Date(),
  });
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
// Error Handling Middleware
app.use(errorMiddleware);

// Start Server



server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});