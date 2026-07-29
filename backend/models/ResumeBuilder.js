import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    fullName:String,

    email:String,

    phone:String,

    location:String,

    summary:String,

    skills:[String],

    education:[String],

    experience:[String],

    projects:[String],

    certifications:[String]

},{
    timestamps:true
});

export default mongoose.model(
    "ResumeBuilder",
    resumeSchema
);