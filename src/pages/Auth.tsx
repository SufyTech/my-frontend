import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // toggle between login and signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isLogin ? "login" : "signup";
      const bodyData = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Authentication failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark">
      {/* Left Image Section */}
      <div className="hidden lg:flex w-2/5 h-screen sticky top-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlOadqDK9W6i17layigSVaN7hlNQr7_joR03NspnLbXSFHM7eTh0yxRz17FOlu7ptF-rP1AkukxovYw2cbzJo3b7uWHfJB4lHj0vzIo0S-wyK4W-0CYcNLtrSMsV7JjCE67Gwzd8jkDLSIuZcPQjqPzZrhrXtOrVkB653kVz-CxWtE2XaCWHYm0BifUa8zTiCIPRb1trOGTbizu_CvgFmKNBKT_naYMtux5YXDSBQJRTlI3nM_j8JYu15u6Xw1iZ2QeJbq_e99LGE")',
          }}
        ></div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-primary text-4xl font-extrabold select-none">
              {"{ }"}
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              CodeAI
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex mb-6 border-b border-slate-200 dark:border-border-dark">
            <button
              className={`flex-1 py-2 font-bold ${
                isLogin
                  ? "border-b-2 border-primary text-primary"
                  : "text-slate-500 dark:text-text-muted"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 font-bold ${
                !isLogin
                  ? "border-b-2 border-primary text-primary"
                  : "text-slate-500 dark:text-text-muted"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-base text-slate-500 dark:text-text-muted">
              {isLogin
                ? "Log in to your account to continue"
                : "Sign up to get started with CodeAI"}
            </p>
          </div>

          {/* Google Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex w-full items-center justify-center gap-2 mb-6 h-12 rounded-lg bg-slate-200 dark:bg-[#282b39] text-slate-900 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-[#3a3e52] transition"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-slate-200 dark:border-border-dark" />
            <p className="text-sm text-slate-500 dark:text-text-muted">OR</p>
            <hr className="flex-1 border-slate-200 dark:border-border-dark" />
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            {!isLogin && (
              <label className="flex flex-col">
                <span className="text-slate-900 dark:text-white pb-2">
                  Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg border p-3 focus:ring-2 focus:ring-primary text-black focus:outline-none"
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </label>
            )}

            {/* Email */}
            <label className="flex flex-col">
              <span className="text-slate-900 dark:text-white pb-2">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border p-3 focus:ring-2 focus:ring-primary text-black focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </label>

            {/* Password */}
            <label className="flex flex-col">
              <div className="flex justify-between pb-2">
                <span className="text-slate-900 dark:text-white">Password</span>
                {isLogin && (
                  <button
                    type="button"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="flex items-stretch">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 rounded-l-lg border p-3 focus:ring-2 text-black focus:ring-primary focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-4 flex items-center border rounded-r-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-[#3a3e52] transition"
                >
                  <span className="material-symbols-outlined text-slate-500">
                    {showPassword ? "close" : "show"}
                  </span>
                </button>
              </div>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                ? "Log In"
                : "Sign Up"}
            </button>
          </form>

          {/* Toggle link */}
          <p className="text-center text-sm text-slate-500 dark:text-text-muted mt-6">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-bold hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
