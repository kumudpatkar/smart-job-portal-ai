import { useState } from "react";
import axios from "axios";


const ApplyJobModal = ({jobId, closeModal}) => {


const [coverLetter,setCoverLetter] = useState("");
const [resume,setResume] = useState(null);
const [loading,setLoading] = useState(false);



const applyJob = async(e)=>{

e.preventDefault();


try{


setLoading(true);


const formData = new FormData();

formData.append(
"coverLetter",
coverLetter
);


formData.append(
"resume",
resume
);



const token = localStorage.getItem("token");



const response = await axios.post(

`http://localhost:5000/api/applications/apply/${jobId}`,

formData,

{
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"multipart/form-data"
}
}

);



alert(response.data.message);


closeModal();



}catch(error){

console.log(error);

alert(
error.response?.data?.message ||
"Application failed"
);


}finally{

setLoading(false);

}


};



return (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center">


<div className="bg-white p-6 rounded-xl w-[450px]">


<h2 className="text-xl font-bold mb-4">
Apply For Job
</h2>



<form onSubmit={applyJob}>


<textarea

className="border p-3 w-full mb-3 rounded"

placeholder="Write cover letter"

value={coverLetter}

onChange={(e)=>setCoverLetter(e.target.value)}

/>



<input

type="file"

accept=".pdf"

className="mb-4"

onChange={(e)=>setResume(e.target.files[0])}

/>



<button

disabled={loading}

className="bg-blue-600 text-white px-5 py-2 rounded"

>

{
loading
?
"Submitting..."
:
"Submit Application"
}

</button>



<button

type="button"

onClick={closeModal}

className="ml-3 border px-5 py-2 rounded"

>

Cancel

</button>



</form>


</div>


</div>

)

}


export default ApplyJobModal;