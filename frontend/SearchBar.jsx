import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mb-8">

      <div className="relative">

        <Search
          className="absolute left-4 top-3.5 text-slate-400"
          size={22}
        />

        <input
          type="text"
          placeholder="Search by job title, company or skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            pl-12
            pr-5
            py-3
            rounded-xl
            border
            border-slate-300
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

    </div>
  );
};

export default SearchBar;