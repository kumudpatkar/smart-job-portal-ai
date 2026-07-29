import { evaluateVideoAnswer }
from "../ai/videoInterviewEvaluator.js";
import InterviewHistory from "../models/InterviewHistory.js";

export const evaluateInterview = async (
req,
res
)=>{

try{

const {
question,
answer
}=req.body;

const result =
await evaluateVideoAnswer(
question,
answer
);

await InterviewHistory.create({

    user:req.user._id,

    technicalScore:result.technicalScore,

    communicationScore:result.communicationScore,

    confidenceScore:result.confidenceScore,

    overallScore:result.overallScore,

    strengths:result.strengths,

    improvements:result.improvements,

    feedback:result.feedback

});

res.json(result);
}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};