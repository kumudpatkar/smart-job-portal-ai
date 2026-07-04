import { useState } from "react";
import API from "../services/api";

function CareerRoadmap() {

  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {

    if (!goal) {
      alert("Please enter your career goal.");
      return;
    }

    try {

      setLoading(true);

      const { data } = await API.post(
        "/career-roadmap/generate",
        {
          goal,
        }
      );

      setRoadmap(data.roadmap);

    } catch (error) {

      console.log(error);

      alert("Unable to generate roadmap.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Career Roadmap
      </h1>

      <input
        type="text"
        placeholder="Example: Become a Senior AI Engineer"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="w-full border rounded-xl p-3"
      />

      <button
        onClick={generateRoadmap}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Generating..." : "Generate Roadmap"}
      </button>

      {roadmap && (

        <div className="mt-10">

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-bold">

              Current Level

            </h2>

            <p>{roadmap.currentLevel}</p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-bold">

              Target Level

            </h2>

            <p>{roadmap.targetLevel}</p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-bold mb-5">

              Roadmap

            </h2>

            {

              roadmap.roadmap.map((step, index) => (

                <div
                  key={index}
                  className="border-l-4 border-blue-600 pl-4 mb-6"
                >

                  <h3 className="font-bold text-xl">

                    Step {step.step} : {step.title}

                  </h3>

                  <p className="mt-2">

                    {step.description}

                  </p>

                  <span className="text-blue-600">

                    Duration : {step.duration}

                  </span>

                </div>

              ))

            }

          </div>

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-bold">

              Recommended Skills

            </h2>

            <ul className="list-disc ml-6 mt-3">

              {

                roadmap.recommendedSkills.map((skill, index) => (

                  <li key={index}>{skill}</li>

                ))

              }

            </ul>

          </div>

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-bold">

              Recommended Certifications

            </h2>

            <ul className="list-disc ml-6 mt-3">

              {

                roadmap.recommendedCertifications.map((item, index) => (

                  <li key={index}>{item}</li>

                ))

              }

            </ul>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold">

              AI Career Advice

            </h2>

            <p className="mt-3">

              {roadmap.careerAdvice}

            </p>

          </div>

        </div>

      )}

    </div>

  );

}

export default CareerRoadmap;