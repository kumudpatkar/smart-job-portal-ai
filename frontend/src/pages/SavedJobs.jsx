import { useEffect, useState } from "react";
import API from "../services/api";
import AnimatedPage from "../components/AnimatedPage";
import { Trash2, Briefcase } from "lucide-react";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);

      const res = await API.get("/api/saved-jobs");

      setJobs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeJob = async (job) => {
    try {
      await API.delete("/api/remove-saved-job", {
        data: {
          job_title: job.job_title,
          company: job.company,
        },
      });

      setJobs((prev) =>
        prev.filter(
          (item) =>
            !(
              item.job_title === job.job_title &&
              item.company === job.company
            )
        )
      );

      alert("Job removed successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to remove job");
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          ⭐ Saved Jobs
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">
            Loading...
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <Briefcase
              size={60}
              className="mx-auto text-gray-300 mb-4"
            />

            <h2 className="text-2xl font-semibold text-gray-700">
              No Saved Jobs
            </h2>

            <p className="text-gray-500 mt-2">
              Save jobs to view them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {job.job_title}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    {job.company}
                  </p>
                </div>

                <button
                  onClick={() => removeJob(job)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                >
                  <Trash2 size={18} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}

export default SavedJobs;