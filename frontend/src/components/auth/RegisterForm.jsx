import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
  fullName: "",
  email: "",
  password: "",
  role: "candidate",
});

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      alert("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Full Name"
        required
        value={form.fullName}
        onChange={(e) =>
          setForm({
            ...form,
            fullName: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl text-white placeholder:text-slate-400"
      />

      <input
        type="email"
        placeholder="Email Address"
        required
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;