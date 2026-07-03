import { Upload, FileText, Download } from "lucide-react";
import { useState } from "react";

const ResumeCard = () => {
  const [resume, setResume] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Resume
      </h2>

      <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center">

        <Upload
          size={50}
          className="mx-auto text-blue-500 mb-4"
        />

        <h3 className="text-xl font-semibold">
          Upload Resume
        </h3>

        <p className="text-gray-500 mt-2">
          PDF, DOC or DOCX (Maximum 5 MB)
        </p>

        <label className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-700">

          Choose File

          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
          />

        </label>

      </div>

      {resume && (

        <div className="mt-8 bg-gray-100 rounded-xl p-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <FileText className="text-blue-600" />

            <div>

              <p className="font-semibold">
                {resume.name}
              </p>

              <p className="text-sm text-gray-500">
                {(resume.size / 1024).toFixed(2)} KB
              </p>

            </div>

          </div>

          <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">

            <Download size={18} />

            Download

          </button>

        </div>

      )}

    </div>
  );
};

export default ResumeCard;