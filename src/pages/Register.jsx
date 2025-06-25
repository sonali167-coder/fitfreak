import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const existingUser = JSON.parse(localStorage.getItem("fitfreakUser"));

      if (existingUser && existingUser.email === form.email) {
        toast.error("User already registered with this email!");
        setLoading(false);
        return;
      }

      localStorage.setItem("fitfreakUser", JSON.stringify(form));
      toast.success("Registered successfully!");
      setLoading(false);
      navigate("/login");
    }, 1200); // fake loading animation
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-8 rounded-xl border border-orange-500 w-full max-w-sm shadow-orange-glow animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-6 drop-shadow-[0_0_6px_#ff6a00]">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black border border-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black border border-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          required
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-sm text-orange-300 cursor-pointer select-none"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-orange-500 text-white py-2 rounded font-semibold transition-all shadow-md shadow-orange-400 ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-400 hover:underline hover:text-orange-300"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
