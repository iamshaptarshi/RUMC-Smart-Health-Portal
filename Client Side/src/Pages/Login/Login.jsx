import { useState } from "react";
import axiosProvider from "../../APIs/axiosProvider";
import ruLogo from "../../assets/ruLogo.png";
import health from "../../assets/health.png";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../Authentication/AuthProvider";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosProvider.post("/api/auth/login", {
        userId: studentId, // 🔥 IMPORTANT: backend expects userId
        password,
      });

      const user = res.data.user;

      // ✅ Save user (NOT token)
      login(user);

      // 🔥 Role-based redirect
      if (user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "patient") {
        navigate("/");
      } else if (user.role === "lab") {
        navigate("/lab/dashboard");
      }

      toast.success("Logged In Successfully")
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary w-full p-4">
      {/* Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-3xl overflow-hidden w-full max-w-4xl h-auto md:h-[75%]">
        {/* বাম পাশের ফর্ম */}
        <div className="md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8">
          <img src={ruLogo} alt="Logo" className="w-16 md:w-20 mb-6" />

          <h1 className="text-2xl md:text-4xl font-extrabold text-purple-700 mb-2 text-center">
            Welcome to RUMC
          </h1>
          <p className="text-sm md:text-lg text-gray-600 mb-6 text-center">
            Smart Health Portal
          </p>

          <form onSubmit={handleLogin} className="w-full max-w-sm">
            {error && (
              <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
            )}

            {/* User ID Input */}
            <div className="flex items-center border rounded mb-3 p-2 md:p-3 focus-within:ring-2 focus-within:ring-purple-500">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Your User ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full outline-none text-sm md:text-base"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border rounded mb-3 p-2 md:p-3 focus-within:ring-2 focus-within:ring-purple-500">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-sm md:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-purple-600">
                {showPassword ?
                  <FaEyeSlash />
                : <FaEye />}
              </button>
            </div>

            {/* Login Button with Icon */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700 transition font-semibold text-sm md:text-base">
              <FaSignInAlt /> Login
            </button>
          </form>
        </div>

        {/* ডান পাশের ইমেজ */}
        <div className="md:w-1/2 bg-purple-100 flex justify-center items-center p-4 md:p-6">
          <img
            src={health}
            alt="Health Illustration"
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
