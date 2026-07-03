const AuthTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex bg-slate-100 p-1 rounded-xl mb-6">

      <button
        onClick={() => setActiveTab("login")}
        className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
          activeTab === "login"
            ? "bg-white shadow-md text-indigo-600"
            : "text-slate-500"
        }`}
      >
        Login
      </button>

      <button
        onClick={() => setActiveTab("register")}
        className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
          activeTab === "register"
            ? "bg-white shadow-md text-indigo-600"
            : "text-slate-500"
        }`}
      >
        Register
      </button>

    </div>
  );
};

export default AuthTabs;