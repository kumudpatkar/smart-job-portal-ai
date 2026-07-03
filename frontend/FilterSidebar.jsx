import {
  MapPin,
  Briefcase,
  IndianRupee,
  Building2,
} from "lucide-react";

const FilterSidebar = ({
  filters,
  setFilters,
}) => {
  const updateFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Filters
      </h2>

      {/* Location */}

      <div className="mb-6">

        <label className="flex items-center gap-2 font-semibold mb-2 text-slate-700">
          <MapPin size={18} className="text-blue-600" />
          Location
        </label>

        <input
          type="text"
          placeholder="e.g. Mumbai"
          value={filters.location}
          onChange={(e) =>
            updateFilter("location", e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Experience */}

      <div className="mb-6">

        <label className="flex items-center gap-2 font-semibold mb-2 text-slate-700">
          <Briefcase size={18} className="text-green-600" />
          Experience
        </label>

        <select
          value={filters.experience}
          onChange={(e) =>
            updateFilter("experience", e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Any Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1 Year">1 Year</option>
          <option value="2 Years">2 Years</option>
          <option value="3 Years">3+ Years</option>
          <option value="5 Years">5+ Years</option>
        </select>

      </div>

      {/* Salary */}

      <div className="mb-6">

        <label className="flex items-center gap-2 font-semibold mb-2 text-slate-700">
          <IndianRupee size={18} className="text-purple-600" />
          Salary
        </label>

        <select
          value={filters.salary}
          onChange={(e) =>
            updateFilter("salary", e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Any Salary</option>
          <option value="3 LPA">3+ LPA</option>
          <option value="5 LPA">5+ LPA</option>
          <option value="8 LPA">8+ LPA</option>
          <option value="10 LPA">10+ LPA</option>
          <option value="15 LPA">15+ LPA</option>
        </select>

      </div>

      {/* Company */}

      <div className="mb-8">

        <label className="flex items-center gap-2 font-semibold mb-2 text-slate-700">
          <Building2 size={18} className="text-orange-600" />
          Company
        </label>

        <input
          type="text"
          placeholder="Google"
          value={filters.company}
          onChange={(e) =>
            updateFilter("company", e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
        />

      </div>

      {/* Clear Filters */}

      <button
        onClick={() =>
          setFilters({
            location: "",
            experience: "",
            salary: "",
            company: "",
          })
        }
        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Clear Filters
      </button>

    </div>
  );
};

export default FilterSidebar;