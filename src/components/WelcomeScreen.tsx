import React from "react";
// import { Logo } from './Logo';

interface WelcomeScreenProps {
  onStartReview: () => void;
  onGoToDashboard: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartReview,
  onGoToDashboard,
}) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-x-hidden p-4 sm:p-6 md:p-8">
      {/* Absolute Logo Position matching design */}
      <div className="absolute top-6 left-6 hidden md:flex">
        {/* <Logo /> */}
      </div>

      {/* Mobile Logo centered top */}
      <div className="flex md:hidden w-full justify-center mb-8">
        {/* <Logo /> */}
      </div>

      <div className="layout-container flex h-full grow flex-col justify-center animate-fade-in-up">
        <div className="flex flex-1 items-center justify-center py-5">
          <div className="layout-content-container flex max-w-4xl flex-1 flex-col items-center">
            <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl sm:text-4xl md:text-5xl font-bold leading-tight px-4 text-center pb-3 pt-6">
              Welcome to CodeReview AI, Alex!
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-normal leading-normal pb-8 pt-1 px-4 text-center max-w-2xl">
              Supercharge your development workflow with AI-powered code
              reviews. Let's get you started.
            </p>

            <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-3">
              {/* Card 1 */}
              <div
                onClick={onStartReview}
                className="group flex flex-1 cursor-pointer flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg dark:border-slate-800 dark:bg-card-dark dark:hover:border-primary/40"
              >
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                  code
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight">
                    Start Your First Review
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                    Let our AI analyze your code in seconds and provide
                    actionable feedback.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div
                onClick={onGoToDashboard} // Placeholder action
                className="group flex flex-1 cursor-pointer flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg dark:border-slate-800 dark:bg-card-dark dark:hover:border-primary/40"
              >
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                  hub
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight">
                    Connect Your Git Repository
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                    Link your GitHub, GitLab, or Bitbucket account to get
                    started automatically.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group flex flex-1 cursor-pointer flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg dark:border-slate-800 dark:bg-card-dark dark:hover:border-primary/40">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                  play_circle
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight">
                    Watch a Quick Tutorial
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                    Learn the basics and see how to get the most out of our key
                    features.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-4 px-4 py-8">
              <button
                onClick={onStartReview}
                className="flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary-hover text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] transition-transform hover:scale-105"
              >
                <span className="truncate">Start First Review</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <button
                onClick={onGoToDashboard}
                className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal underline transition-colors hover:text-primary dark:hover:text-primary/80"
              >
                Skip and go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
