import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to send reset link");
        return;
      }

      setSuccess(true);
    } catch {
      alert("Something went wrong");
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
              Forgot Password
            </h1>
            <p className="text-base text-slate-300">
              Enter your email to receive a password reset link
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
            <label className="flex flex-col">
              <span className="pb-2 text-slate-200">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-lg border border-slate-700 bg-transparent p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {success && (
              <p className="text-green-400 text-sm mt-2">
                Reset link sent! Check your email.
              </p>
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

export default ForgotPassword;
