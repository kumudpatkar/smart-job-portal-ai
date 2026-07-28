import {
  Sparkles,
  Download,
  Loader2,
  User,
  Mail,
  Phone,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function PortfolioGenerator() {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState(null);

  const generatePortfolio = async () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/portfolio-generator", {
        resumeText,
      });

      setPortfolio(data.portfolio);
    } catch (err) {
      console.log(err);
      alert("Unable to generate portfolio.");
    }

    setLoading(false);
  };

  const downloadJSON = () => {
    const blob = new Blob(
      [JSON.stringify(portfolio, null, 2)],
      { type: "application/json" }
    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "portfolio.json";

    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold">
          🌐 AI Portfolio Generator
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Generate your personal portfolio website using AI.
        </p>

        <div className="bg-white rounded-2xl shadow p-8">

          <textarea
            rows={12}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume..."
            className="w-full border rounded-xl p-5"
          />

          <button
            onClick={generatePortfolio}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles />
                Generate Portfolio
              </>
            )}
          </button>

        </div>

        {portfolio && (

          <div className="mt-10">

            <div className="bg-slate-900 text-white rounded-3xl p-10">

              <h1 className="text-5xl font-bold">
                {portfolio.hero?.name}
              </h1>

              <h2 className="text-2xl text-blue-300 mt-3">
                {portfolio.hero?.title}
              </h2>

              <p className="mt-4 text-gray-300">
                {portfolio.hero?.tagline}
              </p>

            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-8">

              <div className="bg-white rounded-2xl shadow p-8">

                <h2 className="text-2xl font-bold mb-5">
                  About
                </h2>

                <p>{portfolio.about}</p>

              </div>

              <div className="bg-white rounded-2xl shadow p-8">

                <h2 className="text-2xl font-bold mb-5">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-3">

                  {portfolio.skills?.map((skill, index) => (

                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-8 mt-8">

              <h2 className="text-2xl font-bold mb-6">
                Projects
              </h2>

              {portfolio.projects?.map((project, index) => (

                <div
                  key={index}
                  className="border rounded-xl p-5 mb-5"
                >

                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">

                    {project.tech?.map((tech, i) => (

                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>

                    ))}

                  </div>

                </div>

              ))}

            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-8">

              <div className="bg-white rounded-2xl shadow p-8">

                <h2 className="text-2xl font-bold mb-5">
                  Education
                </h2>

                {portfolio.education?.map((edu, index) => (
                  <p key={index}>{edu}</p>
                ))}

              </div>

              <div className="bg-white rounded-2xl shadow p-8">

                <h2 className="text-2xl font-bold mb-5">
                  Experience
                </h2>

                {portfolio.experience?.map((exp, index) => (
                  <p key={index}>{exp}</p>
                ))}

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-8 mt-8">

              <h2 className="text-2xl font-bold mb-6">
                Contact
              </h2>

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <Mail />
                  {portfolio.contact?.email}
                </div>

                <div className="flex items-center gap-3">
                  <Phone />
                  {portfolio.contact?.phone}
                </div>

                <div className="flex items-center gap-3">
                  <FaLinkedin size={20} />
                  {portfolio.contact?.linkedin}
                </div>

                <div className="flex items-center gap-3">
                  <FaGithub size={20} />
                  {portfolio.contact?.github}
                </div>

              </div>

            </div>

            <button
              onClick={downloadJSON}
              className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl flex items-center gap-3"
            >
              <Download />
              Download Portfolio JSON
            </button>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default PortfolioGenerator;