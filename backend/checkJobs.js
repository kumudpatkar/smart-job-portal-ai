import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const jobs = await Job.find();

  console.log("ALL JOBS:");
  console.log(jobs);

  process.exit();
};

run();