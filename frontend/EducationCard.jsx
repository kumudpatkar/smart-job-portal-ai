import { GraduationCap } from "lucide-react";

const EducationCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <GraduationCap />
        Education
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input className="border p-2 rounded" placeholder="College Name" />
        <input className="border p-2 rounded" placeholder="Degree" />
        <input className="border p-2 rounded" placeholder="University" />
        <input className="border p-2 rounded" placeholder="Passing Year" />
        <input className="border p-2 rounded" placeholder="CGPA" />

      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Save Education
      </button>

    </div>
  );
};

export default EducationCard;