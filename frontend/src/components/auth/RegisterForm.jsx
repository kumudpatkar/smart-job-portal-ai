import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify(form)
    );

    alert("Registration Successful");

    navigate("/dashboard");
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
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
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