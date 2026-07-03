import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full flex items-center bg-white shadow-md rounded-2xl p-3">

      {/* Icon */}
      <Search className="text-gray-400 mr-2" size={20} />

      {/* Input */}
      <input
        type="text"
        placeholder="Search jobs, companies, skills..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full outline-none text-gray-700"
      />

    </div>
  );
};

export default SearchBar;