import { generateNextQuestion }
from "../ai/interviewSession.js";

export const nextQuestion=async(req,res)=>{

try{

const{
history,
answer
}=req.body;

const result=
await generateNextQuestion(
history,
answer
);

res.json(result);

}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};