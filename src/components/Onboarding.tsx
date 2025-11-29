import React, { useEffect, useRef, useState } from "react";
import {
  Check,
  UserPlus,
  GitMerge,
  Sliders,
  PlayCircle,
  Flag,
} from "lucide-react";
import { OnboardingStep } from "../../types";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingProps {
  steps: OnboardingStep[];
  toggleStep: (id: number) => void;
  skipOnboarding?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({
  steps,
  toggleStep,
  skipOnboarding,
}) => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [popupPos, setPopupPos] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [arrowPos, setArrowPos] = useState<{
    left: number;
    top: number;
    rotation: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /** --- TOUR LOGIC --- */
  const openTour = (start = 0) => {
    setCurrentStep(start);
    setIsTourOpen(true);
    requestAnimationFrame(() => gotoStep(Math.max(0, start)));
  };

  const closeTour = () => {
    setIsTourOpen(false);
    setTargetRect(null);
    setPopupPos(null);
    setArrowPos(null);
  };

  const gotoStep = (index: number) => {
    const idx = Math.max(0, Math.min(index, steps.length - 1));
    setCurrentStep(idx);

    const attemptFind = () => {
      const el = document.getElementById(`onboarding-step-${idx}`);
      if (!el) {
        requestAnimationFrame(attemptFind);
        return;
      }

      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      const rect = el.getBoundingClientRect();
      setTargetRect(rect);

      const popup = computePopupPosition(rect);
      setPopupPos(popup.popupPos);
      setArrowPos(popup.arrowPos);
    };

    requestAnimationFrame(attemptFind);
  };

  const next = () => {
    if (currentStep < steps.length - 1) gotoStep(currentStep + 1);
    else closeTour();
  };

  const prev = () => {
    if (currentStep > 0) gotoStep(currentStep - 1);
  };

  /** --- POSITIONING LOGIC --- */
  const computePopupPosition = (rect: DOMRect) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const popupW = Math.min(520, vw - 32);
    const popupH = 160;
    const margin = 12;

    let left = rect.right + margin;
    let top = rect.top + rect.height / 2 - popupH / 2;
    let arrowLeft = rect.right + 8;
    let arrowTop = rect.top + rect.height / 2;
    let rotation = 180;

    if (left + popupW > vw - 12) {
      left = rect.left - margin - popupW;
      rotation = 0;
      arrowLeft = rect.left - 8;
      arrowTop = rect.top + rect.height / 2;
    }

    if (left < 12 || left + popupW > vw - 12) {
      left = Math.max(12, rect.left + rect.width / 2 - popupW / 2);
      const belowTop = rect.bottom + margin;
      const aboveTop = rect.top - margin - popupH;

      if (belowTop + popupH < vh - 12) {
        top = belowTop;
        arrowTop = rect.bottom + 4;
        arrowLeft = rect.left + rect.width / 2;
        rotation = -90;
      } else if (aboveTop > 12) {
        top = aboveTop;
        arrowTop = rect.top - 4;
        arrowLeft = rect.left + rect.width / 2;
        rotation = 90;
      } else {
        top = (vh - popupH) / 2;
        arrowTop = rect.top + rect.height / 2;
        arrowLeft = rect.left + rect.width / 2;
        rotation = 180;
      }
    }

    top = Math.max(12, Math.min(top, vh - popupH - 12));

    return {
      popupPos: { left, top },
      arrowPos: { left: arrowLeft, top: arrowTop, rotation },
    };
  };

  /** --- EVENT LISTENERS --- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isTourOpen) return;
      if (e.key === "Escape") closeTour();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isTourOpen, currentStep]);

  useEffect(() => {
    if (!isTourOpen) return;
    const onResize = () => gotoStep(currentStep);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isTourOpen, currentStep]);

  useEffect(() => {
    document.body.style.overflow = isTourOpen ? "hidden" : "";
  }, [isTourOpen]);

  /** --- STEP COMPONENTS --- */
  const StepContent = ({ step }: { step: OnboardingStep }) => (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-text-primary-dark">
        {step.title}
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-text-secondary-dark">
        {step.description}
      </p>
    </div>
  );

  const StepCard = ({ step, idx }: { step: OnboardingStep; idx: number }) => (
    <div
      id={`onboarding-step-${idx}`}
      className={`flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border transition-all duration-200 shadow-sm
        ${
          step.isCompleted
            ? "bg-background-dark/50 border-border-dark opacity-80"
            : "bg-background-dark border-border-dark hover:border-primary/50 hover:shadow-md"
        }
      `}
      role="article"
      aria-label={step.title}
      style={{ minWidth: "180px" }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
            step.isCompleted
              ? "bg-success/20 text-success"
              : "bg-primary/20 text-primary"
          }`}
        >
          {step.isCompleted ? (
            <Check size={18} />
          ) : (
            (() => {
              switch (step.iconName) {
                case "user-plus":
                  return <UserPlus size={20} />;
                case "git-merge":
                  return <GitMerge size={20} />;
                case "sliders":
                  return <Sliders size={20} />;
                case "play-circle":
                  return <PlayCircle size={20} />;
                default:
                  return <UserPlus size={20} />;
              }
            })()
          )}
        </div>
        <p
          className={`text-xs sm:text-sm font-medium ${
            step.isCompleted
              ? "text-text-secondary-dark line-through"
              : "text-text-primary-dark"
          }`}
        >
          {step.title}
        </p>
      </div>
      <p className="text-xs sm:text-sm text-text-secondary-dark leading-relaxed">
        {step.description}
      </p>
      <button
        onClick={() => toggleStep(step.id)}
        className={`text-xs sm:text-sm font-semibold text-left transition-colors ${
          step.isCompleted
            ? "text-success/70 hover:text-success"
            : "text-primary hover:text-primary-hover"
        }`}
      >
        {step.isCompleted ? "Completed" : step.actionLabel}
      </button>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 bg-surface-dark border border-border-dark rounded-xl shadow-md relative"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg sm:text-xl font-bold text-text-primary-dark">
            Getting Started
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary-dark">
            Follow these steps to get the most out of Code-AI.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => openTour(0)}
            className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold shadow-md transition"
            aria-haspopup="dialog"
            aria-expanded={isTourOpen}
          >
            <Flag size={14} /> Tour the App
          </button>
          {skipOnboarding && (
            <button
              onClick={skipOnboarding}
              className="text-xs sm:text-sm text-text-secondary-dark hover:text-text-primary-dark transition-colors font-medium"
            >
              Skip Guide
            </button>
          )}
        </div>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 overflow-x-auto">
        {steps.map((step, idx) => (
          <StepCard key={step.id} step={step} idx={idx} />
        ))}
      </div>

      {/* Popup Tour */}
      <AnimatePresence>
        {isTourOpen && popupPos && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={closeTour}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              key="popup"
              className="fixed z-50 bg-gradient-to-b from-surface-dark/95 to-surface-dark rounded-2xl p-6 shadow-2xl w-[90vw] max-w-md sm:max-w-lg"
              style={{ left: popupPos.left, top: popupPos.top }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs sm:text-sm text-text-secondary-dark font-medium">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <button
                  onClick={closeTour}
                  className="text-text-secondary-dark hover:text-text-primary-dark transition"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-text-primary-dark mb-2">
                {steps[currentStep].title}
              </h3>
              <p className="text-sm sm:text-base text-text-secondary-dark mb-4">
                {steps[currentStep].description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={prev}
                  disabled={currentStep === 0}
                  className="px-4 py-2 rounded-lg bg-background-dark hover:bg-background-dark/70 text-text-secondary-dark text-sm disabled:opacity-50 transition"
                >
                  Previous
                </button>
                <button
                  onClick={next}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-hover text-white font-semibold hover:opacity-90 transition"
                >
                  {currentStep === steps.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {steps.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentStep
                        ? "bg-primary"
                        : "bg-text-secondary-dark/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
            {arrowPos && (
              <motion.div
                className="absolute w-4 h-4 bg-primary/70 rotate-45 shadow-lg z-50"
                style={{
                  left: Math.min(arrowPos.left - 2, window.innerWidth - 16),
                  top: Math.min(arrowPos.top - 2, window.innerHeight - 16),
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
