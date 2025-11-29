import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {  // <-- remove : React.FC
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return alert("Please enter your new password");

    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/reset-password`,
        { token, newPassword }
      );

      if (res.data?.message) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#030712] text-white">
      {/* Left Image */}
      <div className="hidden lg:flex w-2/5 h-screen sticky top-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlOadqDK9W6i17layigSVaN7hlNQr7_joR03NspnLbXSFHM7eTh0yxRz17FOlu7ptF-rP1AkukxovYw2cbzJo3b7uWHfJB4lHj0vzIo0S-wyK4W-0CYcNLtrSMsV7JjCE67Gwzd8jkDLSIuZcPQjqPzZrhrXtOrVkB653kVz-CxWtE2XaCWHYm0BifUa8zTiCIPRb1trOGTbizu_CvgFmKNBKT_naYMtux5YXDSBQJRTlI3nM_j8JYu15u6Xw1iZ2QeJbq_e99LGE")',
          }}
        ></div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-md glass-card p-8 rounded-2xl shadow-lg relative">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-primary text-4xl font-extrabold select-none">
              {"{ }"}
            </span>
            <p className="text-2xl font-bold text-white glow-text">CodeAI</p>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-black text-white mb-2">
              Reset Password
            </h1>
            <p className="text-base text-slate-300">
              Enter your new password to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <label className="flex flex-col">
              <span className="pb-2 text-slate-200">New Password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="rounded-lg border border-slate-700 bg-transparent p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            {success && (
              <p className="text-green-400 text-sm mt-2">
                Password reset successful! Redirecting...
              </p>
            )}
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-bold hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
