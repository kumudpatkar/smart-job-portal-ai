import mongoose from "mongoose";

const interviewHistorySchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    technicalScore:Number,

    communicationScore:Number,

    confidenceScore:Number,

    overallScore:Number,

    strengths:[String],

    improvements:[String],

    feedback:String,

    createdAt:{
        type:Date,
        default:Date.now
    }

});

export default mongoose.model(
    "InterviewHistory",
    interviewHistorySchema
);