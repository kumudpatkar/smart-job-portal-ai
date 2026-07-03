import {
  Search,
  Calendar,
  Building2,
  MapPin,
  CheckCircle,
  Clock,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    location: "Bangalore",
    applied: "25 Jun 2026",
    status: "Interview",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Frontend Developer",
    location: "Hyderabad",
    applied: "22 Jun 2026",
    status: "Applied",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Java Developer",
    location: "Pune",
    applied: "20 Jun 2026",
    status: "Selected",
  },
  {
    id: 4,
    company: "Infosys",
    role: "AI Engineer",
    location: "Mumbai",
    applied: "18 Jun 2026",
    status: "Rejected",
  },
];

const statusColor = {
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Selected: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function AppliedJobs() {
  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Applied Jobs
          </h1>

          <p className="text-gray-500 mt-2">
            Track all your job applications.
          </p>
        </div>

        <div className="relative">

          <Search
            className="absolute left-4 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search company..."
            className="pl-11 pr-5 py-3 border rounded-xl w-72"
          />

        </div>

      </div>

      <div className="grid gap-6">

        {jobs.map((job) => (

          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  {job.role}
                </h2>

                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <Building2 size={17} />
                  {job.company}
                </div>

                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <MapPin size={17} />
                  {job.location}
                </div>

                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <Calendar size={17} />
                  Applied on {job.applied}
                </div>

              </div>

              <div className="flex flex-col items-end">

                <span
                  className={`px-4 py-2 rounded-full font-semibold ${statusColor[job.status]}`}
                >
                  {job.status}
                </span>

                <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                  View Details
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

        <div className="bg-white rounded-xl shadow p-5">
          <Clock className="text-blue-600 mb-3" />
          <h2 className="text-3xl font-bold">18</h2>
          <p>Total Applied</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <CheckCircle className="text-green-600 mb-3" />
          <h2 className="text-3xl font-bold">6</h2>
          <p>Interviews</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <CheckCircle className="text-purple-600 mb-3" />
          <h2 className="text-3xl font-bold">2</h2>
          <p>Selected</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <Clock className="text-red-600 mb-3" />
          <h2 className="text-3xl font-bold">4</h2>
          <p>Rejected</p>
        </div>

      </div>

    </div>
  );
}