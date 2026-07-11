import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function JobRecommendation() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadRecommendations();

  }, []);

  const loadRecommendations = async () => {

    try {

      const { data } = await API.get(
        "/job-recommendation"
      );

      setJobs(data.recommendations);

    } catch (error) {

      console.log(error);

      alert("Failed to load recommendations.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold">

          🤖 AI Job Recommendations

        </h1>

        <p className="text-gray-500 mt-2 mb-8">

          Personalized jobs based on your resume.

        </p>

        {loading ? (

          <div className="text-center py-20 text-xl">

            Loading AI Recommendations...

          </div>

        ) : jobs.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            No recommendations available.

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-8">

            {jobs.map((job) => (

              <div
                key={job.jobId}
                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">

                      {job.title}

                    </h2>

                    <p className="text-blue-600 mt-2">

                      {job.company}

                    </p>

                  </div>

                  <div className="text-right">

                    <div className="text-3xl font-bold text-green-600">

                      {job.matchScore}%

                    </div>

                    <div className="text-sm text-gray-500">

                      Match

                    </div>

                  </div>

                </div>

                {/* Progress */}

                <div className="mt-5">

                  <div className="w-full bg-gray-200 rounded-full h-4">

                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-600 h-4 rounded-full"
                      style={{
                        width: `${job.matchScore}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Job Info */}

                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div>

                    <span className="font-semibold">

                      📍 Location

                    </span>

                    <p>{job.location}</p>

                  </div>

                  <div>

                    <span className="font-semibold">

                      💰 Salary

                    </span>

                    <p>{job.salary}</p>

                  </div>

                  <div>

                    <span className="font-semibold">

                      💼 Job Type

                    </span>

                    <p>{job.jobType}</p>

                  </div>

                </div>

                {/* Matching Skills */}

                <div className="mt-8">

                  <h3 className="font-bold text-green-700">

                    Matching Skills

                  </h3>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {job.matchingSkills.map((skill, index) => (

                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                      >

                        {skill}

                      </span>

                    ))}

                  </div>

                </div>

                {/* Missing Skills */}

                <div className="mt-8">

                  <h3 className="font-bold text-red-700">

                    Missing Skills

                  </h3>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {job.missingSkills.map((skill, index) => (

                      <span
                        key={index}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
                      >

                        {skill}

                      </span>

                    ))}

                  </div>

                </div>

                {/* AI Recommendation */}

                <div className="mt-8 bg-blue-50 rounded-xl p-5">

                  <h3 className="font-bold">

                    AI Recommendation

                  </h3>

                  <p className="mt-2">

                    {job.recommendation}

                  </p>

                </div>

                <button
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
                >

                  🚀 Apply Now

                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}

export default JobRecommendation;