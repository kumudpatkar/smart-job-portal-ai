import {
  Building2,
  MapPin,
  Briefcase,
  IndianRupee,
  Bookmark,
} from "lucide-react";

const JobCard = ({ job, onClick, onApply, onSave }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {job.title}
          </h2>

          <div className="flex items-center gap-2 text-slate-500 mt-2">
            <Building2 size={16} />
            {job.company}
          </div>

          <div className="flex items-center gap-2 text-slate-500 mt-2">
            <MapPin size={16} />
            {job.location || "Remote"}
          </div>

          <div className="flex items-center gap-2 text-slate-500 mt-2">
            <Briefcase size={16} />
            {job.experience || "Fresher"}
          </div>

          <div className="flex items-center gap-2 text-green-600 mt-2">
            <IndianRupee size={16} />
            {job.salary || "Not Disclosed"}
          </div>

        </div>

        <button
          onClick={() => onSave(job)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Bookmark />
        </button>

      </div>

      <p className="text-slate-600 mt-4 line-clamp-3">
        {job.description}
      </p>

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => onClick(job)}
          className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-50"
        >
          View Details
        </button>

        <button
          onClick={() => onApply(job)}
          className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          Apply
        </button>

      </div>

    </div>
  );
};

export default JobCard;