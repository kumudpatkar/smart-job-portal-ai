import { MapPin, Briefcase, Bookmark } from "lucide-react";

const JobCard = ({ job, onClick, onApply, onSave }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition cursor-pointer border border-gray-100"
      onClick={onClick}
    >

      {/* Company + Title */}
      <h2 className="text-xl font-bold text-gray-800">
        {job.title}
      </h2>

      <p className="text-gray-500 mt-1">
        {job.company}
      </p>

      {/* Info Row */}
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">

        <span className="flex items-center gap-1">
          <MapPin size={14} /> {job.location || "Remote"}
        </span>

        <span className="flex items-center gap-1">
          <Briefcase size={14} /> {job.experience || "Fresher"}
        </span>

      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {job.skills?.split(",").slice(0, 3).map((skill, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-5">

        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply(job);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
        >
          Apply
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(job);
          }}
          className="text-gray-600 hover:text-blue-600"
        >
          <Bookmark size={18} />
        </button>

      </div>

    </div>
  );
};

export default JobCard;