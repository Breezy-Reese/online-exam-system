import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [isLampOn, setIsLampOn] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);

    if (result.success) {
      if (formData.role === "admin") navigate("/admin");
      else if (formData.role === "teacher") navigate("/teacher");
      else navigate("/exams");
    } else {
      setError(result.error);
    }
  };

  const pullString = () => {
    if (isPulling) return;
    setIsPulling(true);

    setTimeout(() => {
      setIsLampOn((prev) => !prev);
      setIsPulling(false);
    }, 250);
  };

  return (
    <div
      className={`relative flex h-screen items-center justify-center overflow-hidden
      transition-colors duration-700
      ${isLampOn ? "bg-[#1c1f24]" : "bg-black"}`}
    >
      {/* Light cast */}
      {isLampOn && (
        <div
          className="absolute left-[15%] top-0 w-[900px] h-[900px]
          bg-gradient-to-br from-yellow-200/45 via-yellow-100/20 to-transparent
          blur-3xl pointer-events-none z-0"
        />
      )}

      <div className="relative z-10 flex items-center gap-24">
        {/* ===== WHITE LAMP (SHORTER) ===== */}
        <div className="relative flex flex-col items-center h-[360px]">
          {/* Dome */}
          <div className="w-56 h-20 rounded-t-full bg-white" />

          {/* Stem */}
          <div className="w-2 flex-1 bg-white" />

          {/* Base */}
          <div className="w-28 h-3 bg-white rounded-full" />

          {/* Pull String */}
          <div
            onMouseDown={pullString}
            className="absolute right-8 top-16 cursor-pointer flex flex-col items-center select-none"
          >
            <div
              className={`w-px bg-white transition-all duration-300
              ${isPulling ? "h-24" : "h-16"}`}
            />
            <div
              className={`w-3 h-3 rounded-full bg-white transition-transform duration-300
              ${isPulling ? "translate-y-2" : ""}`}
            />
          </div>
        </div>

        {/* ===== FORM (ONLY WHEN LAMP IS ON) ===== */}
        {isLampOn && (
          <div className="relative w-96 p-8 rounded-xl bg-white/95 shadow-[0_0_80px_rgba(253,224,71,0.4)]">
            <h2 className="text-2xl font-semibold mb-6 text-center">Welcome</h2>

            {error && (
              <p className="text-red-500 mb-4 text-center">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e5c76b] text-black py-2 rounded-md font-medium hover:bg-[#f0d87d]"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-yellow-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
