const skills = [
  {
    name: "Resume Completion",
    value: 92,
    color: "bg-blue-500",
  },
  {
    name: "Profile Strength",
    value: 85,
    color: "bg-green-500",
  },
  {
    name: "Interview Readiness",
    value: 70,
    color: "bg-purple-500",
  },
  {
    name: "Skill Match",
    value: 78,
    color: "bg-pink-500",
  },
];

const CareerProgress = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        📈 Career Progress
      </h2>

      <div className="space-y-7">

        {skills.map((skill) => (
          <div key={skill.name}>

            <div className="flex justify-between mb-2">

              <span className="font-medium text-slate-700">
                {skill.name}
              </span>

              <span className="font-bold text-blue-600">
                {skill.value}%
              </span>

            </div>

            <div className="w-full bg-slate-200 rounded-full h-3">

              <div
                className={`${skill.color} h-3 rounded-full`}
                style={{ width: `${skill.value}%` }}
              ></div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CareerProgress;