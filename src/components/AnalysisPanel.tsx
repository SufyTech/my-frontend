import React from "react";
import { AnalysisResult, ReviewType, ReviewItem } from "../../types";
import {
  ShieldAlert,
  Zap,
  AlertTriangle,
  CheckCircle,
  Copy,
  AlertCircle,
} from "lucide-react";

interface AnalysisPanelProps {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  isLoading,
  error,
  result,
}) => {
  const getIcon = (type: ReviewType | string) => {
    switch (type) {
      case ReviewType.SECURITY:
      case "Security":
        return <ShieldAlert size={18} className="text-red-400" />;
      case ReviewType.PERFORMANCE:
      case "Performance":
        return <Zap size={18} className="text-blue-400" />;
      case ReviewType.BUG:
      case "Bug":
        return <AlertTriangle size={18} className="text-orange-400" />;
      case ReviewType.BEST_PRACTICE:
      case "Best Practice":
        return <CheckCircle size={18} className="text-green-400" />;
      default:
        return <AlertCircle size={18} className="text-gray-400" />;
    }
  };

  const getBorderColor = (type: ReviewType | string) => {
    switch (type) {
      case ReviewType.SECURITY:
      case "Security":
        return "border-red-500/30";
      case ReviewType.PERFORMANCE:
      case "Performance":
        return "border-blue-500/30";
      case ReviewType.BUG:
      case "Bug":
        return "border-orange-500/30";
      default:
        return "border-gray-700";
    }
  };

  const reviewItems: ReviewItem[] = result?.reviews || [];

  // Save all reviews as one
  React.useEffect(() => {
    if (!result) return;

    const storedReviews: ReviewItem[] = JSON.parse(
      localStorage.getItem("reviewHistory") || "[]"
    );

    const combinedDescription = result.reviews
      .map(
        (r, i) =>
          `${i + 1}. [${r.type}] ${r.title || "No title"}\n${
            r.description || "No description"
          }\n${r.codeSuggestion || ""}`
      )
      .join("\n\n");

    const language = result.reviews[0]?.language || "javascript";

    const combinedReview: ReviewItem = {
      title: `AI Code Review (${language})`,
      description: combinedDescription,
      type: "Completed",
      language,
      code: "",
      result,
      status: "Completed",
      createdAt: new Date().toISOString(),
    };

    const updatedReviews = [combinedReview, ...storedReviews];
    localStorage.setItem("reviewHistory", JSON.stringify(updatedReviews));
  }, [result]);

  return (
    <div className="flex flex-col h-full bg-[#151922] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-800 bg-[#1A1F2B] sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-gray-100">
          AI Review Analysis
        </h2>
      </div>

      {/* Content */}
      <div
        className="p-5 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-900"
        style={{
          // Adjust height for mobile and sidebar
          maxHeight: "calc(100vh - 80px)", 
          minHeight: "300px",
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
              <div
                className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-purple-500/20 border-b-purple-500 animate-spin"
                style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
              ></div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-white">Analyzing code...</h3>
              <p className="text-sm text-gray-500">AI models are running...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="text-red-500 mt-0.5 shrink-0" size={20} />
            <div>
              <h4 className="text-red-400 font-medium text-sm">Analysis Failed</h4>
              <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Reviews */}
        {!isLoading &&
          reviewItems.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl border bg-[#1A1F2B]/50 p-4 transition-all hover:bg-[#1A1F2B] ${getBorderColor(
                item.type
              )}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIcon(item.type)}
                  <span
                    className={`text-sm font-medium ${
                      item.type === ReviewType.SECURITY || item.type === "Security"
                        ? "text-red-400"
                        : item.type === ReviewType.PERFORMANCE || item.type === "Performance"
                        ? "text-blue-400"
                        : item.type === ReviewType.BUG || item.type === "Bug"
                        ? "text-orange-400"
                        : "text-gray-300"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              </div>

              <h3 className="text-gray-200 font-medium mb-1">{item.title}</h3>
              <p className="text-gray-400 text-base leading-relaxed mb-3 whitespace-pre-wrap break-words">
                {item.description}
              </p>

              {item.codeSuggestion && (
                <div className="relative mt-3 group">
                  <pre className="bg-[#0B0E14] rounded-lg p-3 text-sm text-gray-300 font-mono overflow-x-auto border border-gray-800">
                    <code>{item.codeSuggestion}</code>
                  </pre>
                  <button
                    onClick={() => navigator.clipboard.writeText(item.codeSuggestion || "")}
                    className="absolute top-2 right-2 p-1.5 bg-gray-800 rounded-md text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white hover:bg-gray-700"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AnalysisPanel;
