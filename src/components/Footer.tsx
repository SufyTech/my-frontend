import React from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-black pt-16 pb-8">
      {/* Grid Sections */}
      <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-2 md:grid-cols-4 mb-16">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <span className="font-bold text-xl text-white block mb-4">
            CodeMind AI
          </span>
          <p className="text-slate-500 text-sm leading-relaxed">
            Empowering developers to ship better code faster with AI-driven
            insights.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <a
                href="/features"
                className="hover:text-white transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/projects"
                className="hover:text-white transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Community
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-600 text-xs text-center sm:text-left">
          © 2025 CodeMind AI. All rights reserved.
        </p>

        <div className="flex items-center justify-center sm:justify-end gap-4 text-slate-500">
          <a
            href="https://twitter.com/@sk_beater"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-transform duration-200"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>

          <a
            href="https://github.com/SufyTech"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-transform duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/sufiyan-khan-a86521301"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-transform duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
