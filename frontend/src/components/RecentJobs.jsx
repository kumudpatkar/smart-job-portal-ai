import {
  MapPin,
  IndianRupee,
  Clock3,
} from "lucide-react";

const jobs = [
  {
    company: "Google",
    role: "Software Engineer",
    salary: "₹18 LPA",
    location: "Bangalore",
    time: "2 days ago",
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    company: "Microsoft",
    role: "Frontend Developer",
    salary: "₹15 LPA",
    location: "Hyderabad",
    time: "Today",
    logo: "https://logo.clearbit.com/microsoft.com",
  },
  {
    company: "Amazon",
    role: "Java Developer",
    salary: "₹16 LPA",
    location: "Pune",
    time: "1 day ago",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    company: "Infosys",
    role: "AI Engineer",
    salary: "₹9 LPA",
    location: "Mumbai",
    time: "3 days ago",
    logo: "https://logo.clearbit.com/infosys.com",
  },
];

const RecentJobs = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          🔥 Latest Jobs
        </h2>

        <button className="text-blue-600 font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-5">

        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded-2xl p-5 hover:shadow-xl hover:border-blue-500 transition-all duration-300"
          >

            <div className="flex gap-5 items-center">

              <img
                src={job.logo}
                alt={job.company}
                className="w-14 h-14 rounded-xl"
              />

              <div>

                <h3 className="text-xl font-bold">
                  {job.role}
                </h3>

                <p className="text-gray-500">
                  {job.company}
                </p>

                <div className="flex gap-5 mt-3 text-sm text-gray-500">

                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-1">
                    <IndianRupee size={16} />
                    {job.salary}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock3 size={16} />
                    {job.time}
                  </div>

                </div>

              </div>

            </div>

            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition">
              Apply
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default RecentJobs;