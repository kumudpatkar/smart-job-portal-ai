import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
  CheckCircle2,
} from "lucide-react";

function UploadResume({
  loading = false,
  onUpload,
  onChange,
}) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ==========================
  // Validate File
  // ==========================
  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF and DOCX files are allowed.");
      return false;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB.");
      return false;
    }

    return true;
  };

  // ==========================
  // Fake Upload Animation
  // ==========================
  const simulateUpload = (selectedFile) => {
    setFile(selectedFile);
    setUploadProgress(0);

    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;

      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        if (onChange) {
          onChange({
            target: {
              files: [selectedFile],
            },
          });
        }
      }
    }, 80);
  };

  // ==========================
  // Handle File
  // ==========================
  const handleFile = (selectedFile) => {
    if (!validateFile(selectedFile)) return;

    simulateUpload(selectedFile);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    handleFile(e.dataTransfer.files[0]);
  };

  // ==========================
  // Remove File
  // ==========================
  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (onChange) {
      onChange({
        target: {
          files: [],
        },
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-2">
        Upload Resume
      </h2>

      <p className="text-gray-500 mb-8">
        Upload your latest resume for AI-powered ATS analysis.
      </p>

      {!file ? (
        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 p-14 text-center ${
            dragging
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-500"
          }`}
        >
          <UploadCloud
            size={70}
            className="mx-auto text-blue-600"
          />

          <h3 className="text-2xl font-bold mt-5">
            Drag & Drop Resume
          </h3>

          <p className="text-gray-500 mt-2">
            or click to browse
          </p>

          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              PDF
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              DOCX
            </span>

            <span className="bg-gray-100 px-4 py-2 rounded-full">
              Max 5 MB
            </span>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="border rounded-3xl p-8">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-4">

              <FileText
                size={45}
                className="text-blue-600"
              />

              <div>

                <h3 className="font-bold text-lg">
                  {file.name}
                </h3>

                <p className="text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>

              </div>

            </div>

            <button
              onClick={removeFile}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={26} />
            </button>

          </div>

          <div className="mt-8">

            <div className="flex justify-between mb-2">

              <span className="font-medium">
                Upload Progress
              </span>

              <span>{uploadProgress}%</span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                style={{
                  width: `${uploadProgress}%`,
                }}
              />

            </div>

            {uploadProgress === 100 && (
              <>
                <div className="flex items-center gap-2 mt-5 text-green-600">

                  <CheckCircle2 size={22} />

                  <span className="font-semibold">
                    Resume Ready for Analysis
                  </span>

                </div>

                <button
                  onClick={onUpload}
                  disabled={loading}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
                >
                  {loading
                    ? "Analyzing Resume..."
                    : "Analyze Resume"}
                </button>
              </>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default UploadResume;