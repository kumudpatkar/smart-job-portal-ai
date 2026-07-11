const COMMON_SKILLS = [
  "Java",
  "Python",
  "JavaScript",
  "React",
  "Node",
  "Express",
  "MongoDB",
  "MySQL",
  "SQL",
  "HTML",
  "CSS",
  "Git",
  "Docker",
  "AWS",
  "Spring Boot",
  "Machine Learning",
  "Deep Learning",
  "TensorFlow",
  "PyTorch",
  "NLP",
  "REST API",
  "DSA",
  "OOP",
  "C++",
  "C",
  "TypeScript",
  "Next.js",
  "Redux",
  "Bootstrap",
  "Tailwind",
];

function extractSkills(text = "") {
  const lower = text.toLowerCase();

  return COMMON_SKILLS.filter(skill =>
    lower.includes(skill.toLowerCase())
  );
}

function calculateMatch(jobSkills = [], resumeSkills = []) {
  const matched = jobSkills.filter(skill =>
    resumeSkills
      .map(s => s.toLowerCase())
      .includes(skill.toLowerCase())
  );

  const missing = jobSkills.filter(skill =>
    !resumeSkills
      .map(s => s.toLowerCase())
      .includes(skill.toLowerCase())
  );

  const score =
    jobSkills.length === 0
      ? 0
      : Math.round((matched.length / jobSkills.length) * 100);

  let level = "Poor";

  if (score >= 90) level = "Excellent";
  else if (score >= 75) level = "Very Good";
  else if (score >= 60) level = "Good";
  else if (score >= 40) level = "Average";

  return {
    score,
    matched,
    missing,
    level,
  };
}

export function rankResume(jobDescription, resumeText) {

  const jobSkills = extractSkills(jobDescription);

  const resumeSkills = extractSkills(resumeText);

  const result = calculateMatch(jobSkills, resumeSkills);

  return {
    atsScore: result.score,

    level: result.level,

    jobSkills,

    resumeSkills,

    matchedSkills: result.matched,

    missingSkills: result.missing,

    suggestions:
      result.missing.map(skill => `Learn ${skill}`),
  };
}