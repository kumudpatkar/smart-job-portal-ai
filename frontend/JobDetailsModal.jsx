import { X, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";

const JobDetailsModal = ({ job, onClose, onApply, onSave }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          {job.title}
        </h2>

        <p className="text-gray-500 mt-1">
          {job.company}
        </p>

        {/* Info Row */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">

          <span className="flex items-center gap-1">
            <MapPin size={16} /> {job.location || "Remote"}
          </span>

          <span className="flex items-center gap-1">
            <Briefcase size={16} /> {job.experience || "Fresher"}
          </span>

          <span className="flex items-center gap-1">
            <DollarSign size={16} /> {job.salary || "Not disclosed"}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={16} /> {job.type || "Full Time"}
          </span>

        </div>

        {/* Description */}
        <div className="mt-5">
          <h3 className="font-semibold text-gray-800 mb-2">
            Job Description
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-5">
          <h3 className="font-semibold text-gray-800 mb-2">
            Skills Required
          </h3>

          <div className="flex flex-wrap gap-2">
            {job.skills?.split(",").map((skill, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={() => onApply(job)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Apply Now
          </button>

          <button
            onClick={() => onSave(job)}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-xl hover:bg-gray-300 transition"
          >
            Save Job
          </button>

        </div>

      </div>
    </div>
  );
};

export default JobDetailsModal;