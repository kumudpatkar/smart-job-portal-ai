import { useEffect,useState } from "react";
import API from "../services/api";

function InterviewHistory(){

const [history,setHistory]=useState([]);

useEffect(()=>{

loadHistory();

},[]);

const loadHistory=async()=>{

const res=await API.get(
"/interview-history"
);

setHistory(res.data);

};

return(

<div className="max-w-6xl mx-auto p-8">

<h1 className="text-4xl font-bold mb-8">

Interview History

</h1>

{history.map((item,index)=>(

<div
key={index}
className="bg-white shadow rounded-xl p-6 mb-6"
>

<h2 className="text-xl font-bold">

Interview #{history.length-index}

</h2>

<p>

Overall Score :

<b>

 {item.overallScore}

</b>

</p>

<p>

Technical :

{item.technicalScore}

</p>

<p>

Communication :

{item.communicationScore}

</p>

<p>

Confidence :

{item.confidenceScore}

</p>

<p className="mt-3">

{item.feedback}

</p>

</div>

))}

</div>

);

}

export default InterviewHistory;