const FilterSidebar = ({ filters, setFilters }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">

      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Filters
      </h2>

      {/* Location */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-600">
          Location
        </label>

        <input
          type="text"
          placeholder="e.g. Mumbai, Remote"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Experience */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-600">
          Experience
        </label>

        <select
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
          className="w-full mt-1 p-2 border rounded-lg"
        >
          <option value="">All</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3">1-3 Years</option>
          <option value="3-5">3-5 Years</option>
          <option value="5+">5+ Years</option>
        </select>
      </div>

      {/* Job Type */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-600">
          Job Type
        </label>

        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
          className="w-full mt-1 p-2 border rounded-lg"
        >
          <option value="">All</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={() =>
          setFilters({
            location: "",
            experience: "",
            type: "",
          })
        }
        className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg text-sm"
      >
        Reset Filters
      </button>

    </div>
  );
};

export default FilterSidebar;