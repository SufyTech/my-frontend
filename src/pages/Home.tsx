// src/pages/Home.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CodeAnalyzer from "../components/CodeAnalyzer";
import Footer from "../components/Footer";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home: React.FC = () => {
  const handleScrollToDemo = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) demoSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans text-slate-50 selection:bg-violet-500/30">
      <Navbar />
      <main>
        <Hero onTryDemo={handleScrollToDemo} />
        <Features />
        <CodeAnalyzer />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
