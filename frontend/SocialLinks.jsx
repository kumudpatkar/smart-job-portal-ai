import { Linkedin, Globe } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Social Links
      </h2>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 mb-2">
            <Linkedin size={18} />
            LinkedIn
          </label>

          <input
            className="w-full border rounded-lg p-3"
            placeholder="LinkedIn URL"
          />
        </div>

        <div>
          <label className="mb-2 block">
            GitHub
          </label>

          <input
            className="w-full border rounded-lg p-3"
            placeholder="GitHub URL"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2">
            <Globe size={18} />
            Portfolio
          </label>

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Portfolio URL"
          />
        </div>
      </div>
    </div>
  );
}