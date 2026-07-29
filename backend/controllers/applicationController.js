import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { createNotification } from "./notificationController.js";
import { sendEmail } from "../utils/email.js";
import User from "../models/User.js";
// ========================================
// Apply For Job
// ========================================
export const applyJob = async (req, res) => {
  try {

    const { coverLetter } = req.body;
    const { jobId } = req.params;


    // Check Job Exists
    const existingJob = await Job.findById(jobId);


    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }



    // Check Duplicate Application

    const alreadyApplied = await Application.findOne({
      applicant: req.user._id,
      job: jobId,
    });


    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }



    // Create Application

    const application = await Application.create({

      applicant: req.user._id,

      job: jobId,

      resume: req.file ? req.file.path : "",

      coverLetter,

    });

    // Notify Recruiter

if(existingJob.companyEmail){

    await sendEmail({

        email: existingJob.companyEmail,

        subject: "New Job Application Received",

        message: `

        <h2>New Application Received</h2>

        <p>Hello Recruiter,</p>

        <p>
        A new candidate has applied for your job posting.
        </p>


        <h3>Job Details</h3>

        <p>
        Position:
        <b>${existingJob.title}</b>
        </p>


        <p>
        Candidate:
        <b>${req.user.name}</b>
        </p>


        <p>
        Email:
        ${req.user.email}
        </p>


        <p>
        Please login to your recruiter dashboard to review the application.
        </p>


        <br>

        <h3>
        Smart Job Portal AI Team
        </h3>

        `

    });

}

    await sendEmail({

    email: req.user.email,

    subject: "Application Submitted Successfully",

    message: `

    <h2>Application Submitted Successfully</h2>

    <p>Hello ${req.user.name},</p>

    <p>
    Your application for 
    <b>${existingJob.title}</b>
    has been successfully submitted.
    </p>

    <p>
    Company: ${existingJob.company}
    </p>

    <p>
    You can track your application status from your dashboard.
    </p>

    <br>

    <h3>Smart Job Portal AI Team</h3>

    `

});


    // Notification

    await createNotification(

      req.user._id,

      "Application Submitted",

      `You successfully applied for ${existingJob.title}.`,

      "success",

      `/jobs/${existingJob._id}`,

      "Briefcase"

    );



    return res.status(201).json({

      success:true,

      message:"Application submitted successfully.",

      application,

    });



  } catch(error){

    console.log(error);

    return res.status(500).json({

      success:false,

      message:error.message,

    });

  }
};




// ========================================
// Get Logged-in User Applications
// ========================================

export const myApplications = async(req,res)=>{

try{


const applications = await Application.find({

applicant:req.user._id,

})

.populate({

path:"job",

populate:{
path:"company"
}

})

.sort({createdAt:-1});



res.status(200).json({

success:true,

count:applications.length,

applications,

});



}catch(error){

res.status(500).json({

success:false,

message:error.message,

});

}

};




// ========================================
// Recruiter View Applications By Job
// ========================================


export const getApplicationsByJob = async(req,res)=>{

try{


const applications = await Application.find({

job:req.params.jobId,

})

.populate("applicant","-password")

.populate({

path:"job",

populate:{
path:"company"
}

})

.sort({createdAt:-1});



res.status(200).json({

success:true,

count:applications.length,

applications,

});



}catch(error){

res.status(500).json({

success:false,

message:error.message,

});

}


};




// ========================================
// Update Application Status
// ========================================


export const updateApplicationStatus = async(req,res)=>{

try{


const {status}=req.body;



const application = await Application.findById(req.params.id);



if(!application){

return res.status(404).json({

success:false,

message:"Application not found"

});

}



application.status=status;


await application.save();

const applicant = await User.findById(application.applicant);

const job = await Job.findById(application.job);



await sendEmail({

    email: applicant.email,


    subject:`Application Status Updated - ${job.title}`,


    message:`

    <h2>Application Status Update</h2>


    <p>Hello ${applicant.name},</p>


    <p>
    Your application status for 
    <b>${job.title}</b>
    has been updated.
    </p>


    <h3>
    Current Status:
    ${status}
    </h3>


    ${
        status === "Accepted"

        ?
        "<p>Congratulations! The recruiter has shortlisted your profile.</p>"

        :

        status === "Rejected"

        ?
        "<p>Thank you for applying. We encourage you to apply for more opportunities.</p>"

        :

        "<p>The recruiter will contact you regarding further steps.</p>"

    }


    <br>


    <h3>
    Smart Job Portal AI Team
    </h3>


    `


});


res.status(200).json({

success:true,

message:"Application status updated successfully.",

application

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};




// ========================================
// Delete Application
// ========================================


export const deleteApplication = async(req,res)=>{


try{


const application = await Application.findOne({

_id:req.params.id,

applicant:req.user._id

});



if(!application){

return res.status(404).json({

success:false,

message:"Application not found"

});

}



await application.deleteOne();



res.status(200).json({

success:true,

message:"Application deleted successfully."

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};