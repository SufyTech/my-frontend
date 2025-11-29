import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Onboarding from "../components/Onboarding";
import ActivityTable from "../components/ActivityTable";
import QualityChart from "../components/QualityChart";

import {
  OnboardingStep,
  ReviewItem,
  ReviewStatus,
  RepositoryActivity,
  RepoStatus,
} from "../../types";
import { getReviewScore } from "../../utils";

interface DashboardProps {
  searchTerm: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "Create Profile",
    description: "Set up your profile to get started",
    iconName: "user-plus",
    isCompleted: false,
    actionLabel: "Complete Profile",
  },
  {
    id: 2,
    title: "Connect Repo",
    description: "Connect your Git repository",
    iconName: "git-merge",
    isCompleted: false,
    actionLabel: "Connect Repo",
  },
  {
    id: 3,
    title: "Configure Settings",
    description: "Customize your workspace settings",
    iconName: "sliders",
    isCompleted: false,
    actionLabel: "Configure",
  },
  {
    id: 4,
    title: "Run First Analysis",
    description: "Analyze your first code snippet",
    iconName: "play-circle",
    isCompleted: false,
    actionLabel: "Analyze Now",
  },
];

const Dashboard: React.FC<DashboardProps> = ({ searchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [steps, setSteps] = useState<OnboardingStep[]>(ONBOARDING_STEPS);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [userName, setUserName] = useState<string>("User");
  const [successMessage, setSuccessMessage] = useState("");

  // Show toast-style success message from login
  useEffect(() => {
    if (location.state && (location.state as any).message) {
      setSuccessMessage((location.state as any).message);
      const timer = setTimeout(() => setSuccessMessage(""), 3000); // hide after 3s
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Load user data, reviews, and onboarding steps
  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) setUserName(storedUser);

    const storedReviews = localStorage.getItem("reviewHistory");
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch {
        setReviews([]);
      }
    }

    const storedSteps = localStorage.getItem("onboardingSteps");
    if (storedSteps) {
      try {
        setSteps(JSON.parse(storedSteps));
      } catch {
        setSteps(ONBOARDING_STEPS);
      }
    }

    const firstTime = localStorage.getItem("firstTimeUser");
    if (firstTime === null || firstTime === "true") {
      setSteps(ONBOARDING_STEPS);
      localStorage.setItem("firstTimeUser", "false");
    }
  }, []);

  const toggleStep = (id: number) => {
    setSteps((prev) => {
      const updated = prev.map((step) =>
        step.id === id ? { ...step, isCompleted: !step.isCompleted } : step
      );
      localStorage.setItem("onboardingSteps", JSON.stringify(updated));
      return updated;
    });
  };

  const skipOnboarding = () => {
    const skipped = steps.map((step) => ({ ...step, isCompleted: true }));
    setSteps(skipped);
    localStorage.setItem("onboardingSteps", JSON.stringify(skipped));
  };

  const metrics = useMemo(() => {
    const totalReviews = reviews.length;
    const completed = reviews.filter(
      (r) => r.status === ReviewStatus.COMPLETED
    ).length;
    const analyzing = reviews.filter(
      (r) => r.status === ReviewStatus.ANALYZING
    ).length;
    const error = reviews.filter((r) => r.status === ReviewStatus.ERROR).length;
    const avgScore = reviews.length
      ? Math.round(
          reviews.reduce((sum, r) => sum + getReviewScore(r), 0) /
            reviews.length
        )
      : 0;
    return { totalReviews, completed, analyzing, error, avgScore };
  }, [reviews]);

  const activityData: RepositoryActivity[] = reviews.map((r, idx) => ({
    id: r.createdAt || idx.toString(),
    name: r.title || "Untitled Review",
    status:
      r.status === ReviewStatus.COMPLETED
        ? RepoStatus.COMPLETED
        : r.status === ReviewStatus.ANALYZING
        ? RepoStatus.IN_PROGRESS
        : RepoStatus.FAILED,
    date: r.createdAt || new Date().toISOString().split("T")[0],
    issuesCount: getReviewScore(r),
  }));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0B0E14] text-white">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 lg:p-12 max-w-full relative">
        {/* Toast-style Success Message */}
        {successMessage && (
          <div className="fixed top-6 right-6 z-50 max-w-xs w-full bg-green-600/95 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 border border-green-500 animate-slide-in">
            <div className="flex-shrink-0 text-lg">✅</div>
            <div className="flex-1 text-sm font-medium">{successMessage}</div>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-white hover:text-green-100 transition"
            >
              ✕
            </button>
          </div>
        )}

        {/* Welcome & CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary-dark">
              Welcome back, {userName}!
            </h1>
            <p className="mt-1 text-text-secondary-dark text-sm sm:text-base">
              Here's a summary of your recent code reviews.
            </p>
          </div>
          <button
            onClick={() => navigate("/review")}
            className="mt-2 md:mt-0 px-4 sm:px-6 py-2 sm:py-3 bg-primary rounded-lg font-semibold hover:bg-primary-hover transition-shadow shadow-md text-sm sm:text-base"
          >
            Start New Code Review
          </button>
        </div>

        {/* Onboarding Card */}
        <div className="mt-6">
          <Onboarding
            steps={steps}
            toggleStep={toggleStep}
            skipOnboarding={skipOnboarding}
          />
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-surface-dark p-4 sm:p-6 rounded-xl border border-border-dark shadow-md flex flex-col">
            <span className="text-text-secondary-dark text-sm sm:text-base">
              Total Reviews
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2">
              {metrics.totalReviews}
            </h3>
          </div>
          <div className="bg-surface-dark p-4 sm:p-6 rounded-xl border border-border-dark shadow-md flex flex-col">
            <span className="text-text-secondary-dark text-sm sm:text-base">
              Completed Reviews
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2">
              {metrics.completed}
            </h3>
          </div>
          <div className="bg-surface-dark p-4 sm:p-6 rounded-xl border border-border-dark shadow-md flex flex-col">
            <span className="text-text-secondary-dark text-sm sm:text-base">
              Average Score
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2">
              {metrics.avgScore}%
            </h3>
          </div>
        </div>

        {/* Activity & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <ActivityTable searchTerm={searchTerm} activities={activityData} />
          </div>
          <div className="lg:col-span-1">
            <QualityChart reviewData={reviews} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
