import { useState } from "react";
import API from "../services/api";

function SalaryPredictor() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predictSalary = async () => {
    if (!role || !experience || !skills) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/salary/predict", {
        role,
        experience: Number(experience),
        skills,
      });

      setResult(data.prediction);

    } catch (error) {
      console.log(error);
      alert("Salary prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Salary Predictor
      </h1>

      <input
        type="text"
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border rounded-xl p-3 mb-4"
      />

      <input
        type="number"
        placeholder="Years of Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="w-full border rounded-xl p-3 mb-4"
      />

      <textarea
        rows={5}
        placeholder="Skills (Python, React, Node.js, AWS...)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full border rounded-xl p-3"
      />

      <button
        onClick={predictSalary}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
      >
        {loading ? "Predicting..." : "Predict Salary"}
      </button>

      {result && (

        <div className="mt-10 bg-white shadow-lg rounded-2xl p-8">

          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Estimated Salary
          </h2>

          <p>
            <strong>Role:</strong> {result.role}
          </p>

          <p>
            <strong>Experience:</strong> {result.experience} Years
          </p>

          <p className="text-2xl font-bold mt-6">
            ₹ {Number(result.estimatedSalary).toLocaleString()} / Year
          </p>

          <p className="mt-4">
            <strong>Salary Range:</strong> {result.salaryRange}
          </p>

          <div className="mt-6 p-4 bg-gray-100 rounded-xl">
            <strong>AI Reason:</strong>

            <p className="mt-2">
              {result.reason}
            </p>
          </div>

        </div>

      )}

    </div>
  );
}

export default SalaryPredictor;