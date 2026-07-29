import ResumeBuilder from "../models/ResumeBuilder.js";

export const saveResume = async(req,res)=>{

try{

const resume=await ResumeBuilder.findOneAndUpdate(

{user:req.user._id},

{

...req.body,

user:req.user._id

},

{

new:true,

upsert:true

}

);

res.json({

success:true,

resume

});

}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

export const getResume=async(req,res)=>{

try{

const resume=await ResumeBuilder.findOne({

user:req.user._id

});

res.json({

success:true,

resume

});

}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};