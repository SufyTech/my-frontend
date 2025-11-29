import React, { useState } from "react";
import { Hexagon, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // close mobile menu after clicking
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="bg-gradient-to-br from-violet-600 to-blue-600 p-2 rounded-lg">
            <Hexagon className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            CodeMind AI
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => handleScroll("about")} className="hover:text-white transition-colors">
            About
          </button>
          <button onClick={() => handleScroll("features")} className="hover:text-white transition-colors">
            Features
          </button>
          <button onClick={() => handleScroll("projects")} className="hover:text-white transition-colors">
            Projects
          </button>
          <button onClick={() => handleScroll("contact")} className="hover:text-white transition-colors">
            Contact
          </button>
        </div>

        {/* Demo Button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleScroll("demo")}
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-violet-500/20"
          >
            Try Demo
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl absolute w-full left-0 top-20 border-t border-white/10">
          <div className="flex flex-col gap-4 px-6 py-6 text-white items-center justify-center">
            <button onClick={() => handleScroll("about")} className="text-left hover:text-violet-400">
              About
            </button>
            <button onClick={() => handleScroll("features")} className="text-left hover:text-violet-400">
              Features
            </button>
            <button onClick={() => handleScroll("projects")} className="text-left hover:text-violet-400">
              Projects
            </button>
            <button onClick={() => handleScroll("contact")} className="text-left hover:text-violet-400">
              Contact
            </button>
            <button
              onClick={() => handleScroll("demo")}
              className="mt-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-violet-500/20"
            >
              Try Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
