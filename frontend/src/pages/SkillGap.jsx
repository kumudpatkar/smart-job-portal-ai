import { useState } from "react";
import API from "../services/api";

function SkillGap() {

  const [targetRole, setTargetRole] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const analyze = async () => {

    if (!targetRole) {
      alert("Enter target role");
      return;
    }

    try {

      setLoading(true);

      const { data } = await API.post(
        "/skill-gap/analyze",
        {
          targetRole,
        }
      );

      setResult(data.analysis);

    } catch (error) {

      console.log(error);

      alert("Skill Gap Analysis Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        AI Skill Gap Analyzer

      </h1>

      <input
        type="text"
        placeholder="Target Role (Example: AI Engineer)"
        value={targetRole}
        onChange={(e) => setTargetRole(e.target.value)}
        className="w-full border rounded-xl p-3"
      />

      <button
        onClick={analyze}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >

        {loading ? "Analyzing..." : "Analyze"}

      </button>

      {

        result && (

          <div className="mt-10 space-y-8">

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">

                Current Skills

              </h2>

              <ul className="list-disc ml-6">

                {

                  result.currentSkills.map((skill, index) => (

                    <li key={index}>{skill}</li>

                  ))

                }

              </ul>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">

                Missing Skills

              </h2>

              <ul className="list-disc ml-6">

                {

                  result.missingSkills.map((skill, index) => (

                    <li key={index}>{skill}</li>

                  ))

                }

              </ul>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">

                Learning Path

              </h2>

              <ol className="list-decimal ml-6">

                {

                  result.learningPath.map((item, index) => (

                    <li key={index}>{item}</li>

                  ))

                }

              </ol>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">

                Recommended Courses

              </h2>

              <ul className="list-disc ml-6">

                {

                  result.recommendedCourses.map((course, index) => (

                    <li key={index}>{course}</li>

                  ))

                }

              </ul>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">

                AI Career Advice

              </h2>

              <p>

                {result.careerAdvice}

              </p>

            </div>

          </div>

        )

      }

    </div>

  );

}

export default SkillGap;