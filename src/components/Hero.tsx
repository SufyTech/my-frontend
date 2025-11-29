import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onTryDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onTryDemo }) => {
  const navigate = useNavigate();
  const gotoLogin = () => navigate("/login");

  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background blobs */}
      <div className="purple-blob top-0 left-1/4 -translate-x-1/2 opacity-40" />
      <div className="purple-blob bottom-0 right-0 translate-x-1/3 opacity-20 bg-blue-500" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-6 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Code-AI is now live
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight text-white">
            AI-Powered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 glow-text">
              Code Review.
            </span>
            <br />
            Shipped Faster.
          </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
            Automate code checks, catch security flaws early, and get
            intelligent insights that help you ship better software — faster and
            with confidence.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={gotoLogin}
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-[0_0_25px_rgba(124,58,237,0.35)] hover:shadow-[0_0_35px_rgba(124,58,237,0.55)] flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onTryDemo}
              className="glass-card hover:bg-white/10 text-white px-8 py-4 rounded-full text-base font-medium transition-all flex items-center gap-2 backdrop-blur-md border border-white/10"
            >
              <Zap className="w-5 h-5 text-yellow-400" />
              Live Demo
            </button>
          </div>
        </div>

        {/* RIGHT — Preview UI */}
        <div className="relative">
          <div className="relative z-10 glass-card rounded-2xl p-1 shadow-2xl shadow-violet-900/20 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
              {/* Code Window Header */}
              <div className="flex items-center px-4 py-3 bg-slate-900 border-b border-slate-800 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                </div>
                <div className="mx-auto text-xs text-slate-500 font-mono tracking-wide">
                  review_job_4281.ts
                </div>
              </div>

              {/* Code */}
              <div className="p-6 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/90 pointer-events-none"></div>

                <p>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-blue-400">analyzeData</span> ={" "}
                  <span className="text-yellow-400">async</span> (data:{" "}
                  <span className="text-green-400">Input[]</span>){" "}
                  <span className="text-violet-400">=&gt;</span> &#123;
                </p>

                <p className="pl-4 text-slate-500">
                  // AI analyzing structure...
                </p>

                <p className="pl-4">
                  <span className="text-violet-400">return</span> data.
                  <span className="text-blue-400">map</span>(item{" "}
                  <span className="text-violet-400">=&gt;</span> &#123;
                </p>

                <p className="pl-8">
                  <span className="text-violet-400">if</span> (!item.isValid){" "}
                  <span className="text-violet-400">throw</span>{" "}
                  <span className="text-green-400">Error</span>(
                  <span className="text-orange-400">"Invalid"</span>);
                </p>

                <p className="pl-8 bg-blue-500/10 border-l-2 border-blue-500 pl-2 my-2 rounded">
                  <span className="text-[10px] uppercase font-bold text-blue-400 block mb-1">
                    Optimization Tip
                  </span>
                  Batch processing can reduce memory overhead for large
                  datasets.
                </p>

                <p className="pl-8">
                  <span className="text-violet-400">return</span>{" "}
                  transform(item);
                </p>

                <p className="pl-4">);</p>
                <p>&#125;</p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-2 bg-slate-800 rounded-full w-24 overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%]"></div>
                  </div>
                  <span className="text-xs text-green-400 font-semibold">
                    85% Quality Score
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -top-12 -right-8 glass-card p-4 rounded-xl animate-bounce">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                ✔
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  No Bugs Found
                </div>
                <div className="text-xs text-slate-400">Latest scan passed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
