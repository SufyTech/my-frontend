import React, { useEffect } from "react";
import { Hexagon } from "lucide-react";

interface LoaderProps {
  onFinish?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 3000); // 3s loader
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900">
      {/* Hexagon icon with subtle glow */}
      <div className="p-4 rounded-full bg-gray-800/50 backdrop-blur-md shadow-lg">
        <Hexagon className="w-16 h-16 text-indigo-500 animate-spin-slow" strokeWidth={1.5} />
      </div>

      {/* Brand */}
      <h1 className="mt-5 text-white text-3xl font-bold tracking-tight animate-fade-up">
        Code-AI
      </h1>

      {/* Dots loader */}
      <div className="flex space-x-2 mt-3">
        <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-75"></span>
        <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-225"></span>
      </div>

      {/* Tagline */}
      <p className="mt-2 text-white/70 text-sm animate-fade-up delay-100">
        Loading your AI-powered code review…
      </p>
    </div>
  );
};

export default Loader;
