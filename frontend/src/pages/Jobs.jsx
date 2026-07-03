import { useEffect, useState } from "react";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import JobCard from "../components/JobCard";
import AnimatedPage from "../components/AnimatedPage";

// ❌ REMOVE JobDetailsModal import (NOT AVAILABLE / CAUSING ERROR)

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    type: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async (job) => {
    try {
      await API.post("/api/apply-job", {
        job_title: job.title,
        company: job.company,
      });

      alert("Applied Successfully 🚀");
    } catch (err) {
      console.log(err);
      alert("Application Failed ❌");
    }
  };

  const saveJob = async (job) => {
    try {
      await API.post("/api/save-job", {
        job_title: job.title,
        company: job.company,
      });

      alert("Job Saved ❤️");
    } catch (err) {
      console.log(err);
      alert("Save Failed ❌");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.toLowerCase().includes(search.toLowerCase()) ||
        job.skills?.toLowerCase().includes(search.toLowerCase())) &&
      (filters.location === "" ||
        job.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.type === "" || job.type === filters.type) &&
      (filters.experience === "" || job.experience === filters.experience)
    );
  });

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-6">

        <SearchBar value={search} onChange={setSearch} />

        <div className="flex gap-6 mt-6">

          <div className="w-1/4">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          <div className="w-3/4">

            {loading ? (
              <p className="text-center text-gray-500">Loading jobs...</p>
            ) : filteredJobs.length === 0 ? (
              <p className="text-center text-gray-500">No jobs found 😔</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job, index) => (
                  <JobCard
                    key={index}
                    job={job}
                    onClick={() => setSelectedJob(job)}
                    onApply={applyJob}
                    onSave={saveJob}
                  />
                ))}
              </div>
            )}

          </div>
        </div>

        {/* ❌ REMOVED JobDetailsModal (prevents crash) */}
        {/* selectedJob modal disabled to avoid white screen */}

      </div>
    </AnimatedPage>
  );
}

export default Jobs;