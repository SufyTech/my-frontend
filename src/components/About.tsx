import React from "react";
import DevImage from "../assets/Dev.png";

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-black relative overflow-hidden border-t border-white/10"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-violet-700/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-700/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left side text */}
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              CodeMind
            </span>
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            CodeMind is a next-generation AI platform built to automate code
            reviews, detect vulnerabilities, and give developers faster and
            smarter insights — all in real-time.
            <br />
            <br />
            Our mission is simple: empower every developer to write clean,
            secure, and production-ready code with the speed of AI.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-3xl font-bold text-white">10k+</h3>
              <p className="text-slate-400 text-sm mt-1">Code Reviews</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-3xl font-bold text-white">98%</h3>
              <p className="text-slate-400 text-sm mt-1">Accuracy Rate</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-3xl font-bold text-white">500+</h3>
              <p className="text-slate-400 text-sm mt-1">Active Users</p>
            </div>
          </div>
        </div>

        {/* Right side image card */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-violet-500/10">
          <img
            src={DevImage}
            className="w-full h-full object-cover opacity-90"
            alt="Developers discussing code"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
