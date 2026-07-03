import { useState } from "react";
import {
  Upload,
  FileText,
  Download,
  CheckCircle,
} from "lucide-react";

const ResumeCard = () => {
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Resume Management
      </h2>

      {/* Upload Area */}

      <label
        htmlFor="resumeUpload"
        className="border-2 border-dashed border-blue-400 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
      >

        <Upload
          size={55}
          className="text-blue-600 mb-5"
        />

        <h3 className="text-xl font-semibold text-slate-700">
          Upload Your Resume
        </h3>

        <p className="text-slate-500 mt-2">
          PDF, DOC or DOCX (Maximum 5MB)
        </p>

        <input
          id="resumeUpload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          hidden
        />

      </label>

      {/* Selected File */}

      {resume && (

        <div className="mt-8 bg-blue-50 rounded-2xl p-5 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <FileText
              size={40}
              className="text-blue-600"
            />

            <div>

              <h3 className="font-semibold">
                {resume.name}
              </h3>

              <p className="text-slate-500">
                {(resume.size / 1024).toFixed(2)} KB
              </p>

            </div>

          </div>

          <CheckCircle
            className="text-green-600"
            size={32}
          />

        </div>

      )}

      {/* Resume Score */}

      <div className="mt-10">

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            AI Resume Score
          </span>

          <span className="font-bold text-green-600">
            92%
          </span>

        </div>

        <div className="w-full bg-slate-200 rounded-full h-4">

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full w-[92%]"></div>

        </div>

      </div>

      {/* ATS Score */}

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            ATS Compatibility
          </span>

          <span className="font-bold text-blue-600">
            95%
          </span>

        </div>

        <div className="w-full bg-slate-200 rounded-full h-4">

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full w-[95%]"></div>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex gap-4 mt-10">

        <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition">

          Upload Resume

        </button>

        <button className="flex items-center justify-center gap-2 flex-1 border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition">

          <Download size={18} />

          Download

        </button>

      </div>

    </div>
  );
};

export default ResumeCard;