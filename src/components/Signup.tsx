import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react"; // added for password toggle

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean | "success">(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    if (error === "already_registered" || error === "not_registered") {
      alert(
        "This email is already registered or not allowed. Please log in instead."
      );
      navigate("/login");
    }
  }, [location, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Please fill all fields");

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstTimeUser", "false");
      setLoading("success");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId: credentialResponse.credential }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Google signup failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstTimeUser", "false");
      setLoading("success");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch {
      alert("Google signup failed");
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
            <h1 className="text-4xl font-black text-white mb-2">Create your account</h1>
            <p className="text-base text-slate-300">Sign up to get started with CodeAI</p>
          </div>

          {/* Google Signup */}
          <div className="mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSignup}
              onError={() => alert("Google signup failed")}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-slate-600" />
            <p className="text-sm text-slate-400">OR</p>
            <hr className="flex-1 border-slate-600" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {/* Name */}
            <label className="flex flex-col">
              <span className="pb-2 text-slate-200">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-lg border border-slate-700 bg-transparent p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </label>

            {/* Email */}
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

            {/* Password */}
            <label className="flex flex-col relative">
              <span className="pb-2 text-slate-200">Password</span>
              <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent p-3 text-white placeholder-slate-400 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 flex items-center justify-center text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading === true}
              className={`
                relative overflow-hidden w-full h-12 bg-primary text-white rounded-lg font-bold
                flex justify-center items-center gap-2 transition-all duration-300
                ${loading === true ? "bg-primary/80 cursor-not-allowed" : "hover:bg-primary/90"}
              `}
            >
              {loading === true && (
                <span className="absolute left-4 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading === "success" && (
                <span className="material-symbols-outlined text-green-400 text-xl animate-bounce">
                  check_circle
                </span>
              )}
              <span className={`transition-all duration-300 ${loading === true || loading === "success" ? "opacity-0" : "opacity-100"}`}>
                Sign Up
              </span>
              {loading === true && <span className="ml-2 text-white text-sm animate-pulse">Signing up...</span>}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-primary font-bold hover:underline">
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
