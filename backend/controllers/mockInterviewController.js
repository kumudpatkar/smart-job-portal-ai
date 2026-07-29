import { askInterviewQuestion } from "../ai/mockInterview.js";

export const continueInterview = async (req,res)=>{

    try{

        const { history, answer } = req.body;

        const result = await askInterviewQuestion(
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