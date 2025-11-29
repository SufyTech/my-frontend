import React from "react";
import { Code2, Wand2, Gauge } from "lucide-react";

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-24 bg-black relative border-t border-white/10 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-80 h-80 bg-violet-600/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
            Explore the powerful AI-driven modules built inside CodeMind.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Card 1 - Code Analyzer */}
          <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 border border-violet-500/40">
              <Code2 className="text-violet-300 w-6 h-6" />
            </div>

            <h3 className="text-2xl text-white font-semibold mb-3">
              Code Analyzer
            </h3>
            <p className="text-slate-400 leading-relaxed">
              AI-powered tool that reviews your code, detects bugs, optimizes 
              performance, and identifies improvement opportunities.
            </p>

            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition border border-violet-500/40"></div>
          </div>

          {/* Card 2 - Live Demo UI */}
          <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/40">
              <Wand2 className="text-blue-300 w-6 h-6" />
            </div>

            <h3 className="text-2xl text-white font-semibold mb-3">
              Live Demo UI
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Test your code instantly in a clean and interactive environment
              and experience how CodeMind AI reviews in real time.
            </p>

            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition border border-blue-500/40"></div>
          </div>

          {/* Card 3 - AI Code Quality Score */}
          <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 border border-indigo-500/40">
              <Gauge className="text-indigo-300 w-6 h-6" />
            </div>

            <h3 className="text-2xl text-white font-semibold mb-3">
              AI Code Quality Score
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Get a professional-quality score powered by AI that measures
              readability, complexity, maintainability, and security levels.
            </p>

            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition border border-indigo-500/40"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
