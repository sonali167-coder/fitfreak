import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext"; 

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser, setPreferences } = useAuth(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("fitfreakUser"));

    if (!savedUser) {
      toast.error("User not found. Please register.");
      return;
    }

    if (
      form.email === savedUser.email &&
      form.password === savedUser.password
    ) {
      toast.success("Login successful!");


      setUser(savedUser);
      const prefs = JSON.parse(localStorage.getItem("fitfreakPrefs"));
      setPreferences(prefs || {});

      navigate("/home");
    } else {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-6 rounded-xl shadow-orange-glow w-full max-w-sm border border-orange-500 animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-center text-orange-400 mb-6 drop-shadow-[0_0_6px_#ff6a00]">
          Welcome Back
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-black border border-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 pr-10 mb-2 rounded bg-black border border-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <span
            onClick={togglePassword}
            className="absolute right-3 top-2.5 text-orange-400 cursor-pointer"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <div className="text-right text-sm text-orange-300 mb-4 hover:underline cursor-pointer transition">
          Forgot Password?
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:scale-105 transition-all shadow-orange-glow"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
