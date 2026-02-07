import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // eye icons

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/facebook`;
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [isLampOn, setIsLampOn] = useState(true);
  const [isPulling, setIsPulling] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // new state for password

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
          bg-gradient-to-br from-yellow-200/40 via-yellow-100/20 to-transparent
          blur-3xl pointer-events-none z-0"
        />
      )}

      <div className="relative z-10 flex items-center gap-24">
        {/* ===== WHITE LAMP (SHORTER) ===== */}
        <div className="relative flex flex-col items-center h-[340px]">
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
          <div className="relative w-96 p-8 rounded-2xl bg-white shadow-[0_0_80px_rgba(253,224,71,0.45)]">
            <h2 className="text-2xl font-semibold text-center">Log in</h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              school exams made easy system
            </p>

            {error && (
              <p className="text-red-500 mb-4 text-center">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm mb-1">Email</label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-1">Password</label>
                <div className="relative">
                  <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </span>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="accent-yellow-500"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-red-500 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Role */}
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

              {/* Login */}
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-full font-medium hover:bg-red-600 transition"
              >
                Log in
              </button>
            </form>

            {/* OR */}
            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-sm text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social login */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100"
              >
                <FcGoogle size={20} />
                Google
              </button>

              <button
                type="button"
                onClick={handleFacebookLogin}
                className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100"
              >
                <FaFacebookF className="text-blue-600" />
                Facebook
              </button>
            </div>

            <p className="mt-5 text-center text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-red-500 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
