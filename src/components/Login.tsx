import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "../context/UserContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<"idle" | "loading" | "success">(
    "idle"
  );

  const fetchCurrentUser = async (token: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.user) {
        if (!data.user.avatar) data.user.avatar = "/default-avatar.png";
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.error("Failed to fetch user after login:", err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error") === "not_registered") {
      alert("This email is not registered. Please sign up first.");
      navigate("/signup");
    }
  }, [location, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");

    try {
      setLoading("loading");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading("idle");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstTimeUser", "false");

      setLoading("success");
      navigate("/dashboard", { state: { message: "Logged in successfully!" } });

      fetchCurrentUser(data.token);
    } catch {
      alert("Something went wrong");
      setLoading("idle");
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId: credentialResponse.credential }),
        }
      );

      const data = await res.json();

      if (!res.ok) return alert(data.error || "Google login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstTimeUser", "false");

      setLoading("success");
      navigate("/dashboard", { state: { message: "Logged in successfully!" } });

      fetchCurrentUser(data.token);
    } catch {
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#030712] text-white">
      {/* Left image (desktop only) */}
      <div className="hidden lg:flex w-2/5 h-screen sticky top-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlOadqDK9W6i17layigSVaN7hlNQr7_joR03NspnLbXSFHM7eTh0yxRz17FOlu7ptF-rP1AkukxovYw2cbzJo3b7uWHfJB4lHj0vzIo0S-wyK4W-0CYcNLtrSMsV7JjCE67Gwzd8jkDLSIuZcPQjqPzZrhrXtOrVkB653kVz-CxWtCWHYm0BifUa8zTiCIPRb1trOGTbizu_CvgFmKNBKT_naYMtux5YXDSBQJRTlI3nM_j8JYu15u6Xw1iZ2QeJbq_e99LGE")',
          }}
        ></div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex justify-center items-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md glass-card p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg relative">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-primary text-3xl sm:text-4xl font-extrabold select-none">
              {"{ }"}
            </span>
            <p className="text-xl sm:text-2xl font-bold text-white glow-text">
              CodeAI
            </p>
          </div>

          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1 sm:mb-2">
              Log in to your account
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Enter your credentials to continue
            </p>
          </div>

          {/* Google Login (responsive) */}
          <div className="mb-4 sm:mb-6 w-full flex justify-center">
            <div className="w-full max-w-xs">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert("Google login failed")}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <hr className="flex-1 border-slate-600" />
            <p className="text-xs sm:text-sm text-slate-400">OR</p>
            <hr className="flex-1 border-slate-600" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-3 sm:gap-4">
            {/* Email */}
            <label className="flex flex-col">
              <span className="pb-1 sm:pb-2 text-slate-200 text-sm sm:text-base">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-lg border border-slate-700 bg-transparent p-2 sm:p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:outline-none text-sm sm:text-base"
                required
              />
            </label>

            {/* Password */}
            <label className="flex flex-col relative">
              <span className="pb-1 sm:pb-2 text-slate-200 text-sm sm:text-base">
                Password
              </span>
              <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent p-2 sm:p-3 text-white placeholder-slate-400 focus:outline-none text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-2 sm:px-3 flex items-center justify-center text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <p
                className="text-right text-xs sm:text-sm text-primary mt-1 cursor-pointer hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </p>
            </label>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading === "loading"}
              className={`relative w-full h-10 sm:h-12 rounded-lg font-bold flex justify-center items-center overflow-hidden transition-all duration-300
                bg-gradient-to-r from-primary/90 to-primary/60
                hover:from-primary/100 hover:to-primary/80
                ${
                  loading === "loading" ? "cursor-not-allowed opacity-80" : ""
                }`}
            >
              {loading === "loading" && (
                <span className="absolute left-0 top-0 h-full bg-white/20 animate-pulse w-full"></span>
              )}
              {loading === "success" && (
                <span className="absolute flex items-center justify-center w-full h-full text-green-400 text-xl opacity-0 animate-fade-in">
                  ✓
                </span>
              )}
              <span
                className={`relative z-10 transition-opacity duration-300 ${
                  loading !== "idle" ? "opacity-0" : "opacity-100"
                }`}
              >
                Log In
              </span>
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-xs sm:text-sm text-slate-400 mt-4 sm:mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-primary font-bold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
