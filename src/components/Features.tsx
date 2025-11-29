import React from "react";
import { Code2, ShieldCheck, Gauge, History, Wrench, Zap } from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: Code2,
      title: "AI Code Review",
      description: "Analyze your code with deep AI insights detecting bugs, structure issues, and improvements."
    },
    {
      icon: ShieldCheck,
      title: "Security Insights",
      description: "Detect SQL injection, XSS, unsafe functions, and common security vulnerabilities."
    },
    {
      icon: Gauge,
      title: "Performance Optimization",
      description: "AI flags slow code, high-complexity blocks, and suggests faster alternatives."
    },
    {
      icon: History,
      title: "Review History",
      description: "Track your analyses, sorted by completed, in-progress, and failed states."
    },
    {
      icon: Wrench,
      title: "Multiple Review Types",
      description: "Run Bug Fixing, Optimization, Readability, Clean Code, Security checks & more."
    },
    {
      icon: Zap,
      title: "Real-Time Feedback",
      description: "Instant results with smart explanations and AI-generated suggestions."
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-violet-500/20 blur-[160px] rounded-full"></div>
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-blue-500/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 text-4xl md:text-5xl font-bold">
            Powerful Features for Developers
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
            Everything you need to review, debug, and optimize your code — powered by AI.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md
                hover:bg-white/10 transition-all shadow-xl shadow-black/5 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl border border-violet-500/40 bg-violet-600/10 
                flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <Icon className="w-7 h-7 text-violet-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
