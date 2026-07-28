import { Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Social Links
      </h2>

      <div className="space-y-5">

        {/* LinkedIn */}
        <div>
          <label className="flex items-center gap-2 mb-2 font-medium">
            <FaLinkedin className="text-blue-600" size={18} />
            LinkedIn
          </label>

          <input
            type="url"
            placeholder="https://linkedin.com/in/your-profile"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="flex items-center gap-2 mb-2 font-medium">
            <FaGithub size={18} />
            GitHub
          </label>

          <input
            type="url"
            placeholder="https://github.com/your-username"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="flex items-center gap-2 mb-2 font-medium">
            <Globe size={18} />
            Portfolio
          </label>

          <input
            type="url"
            placeholder="https://yourportfolio.com"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

      </div>
    </div>
  );
};

export default SocialLinks;