import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ReviewItem, ReviewStatus } from "../../types";
import {
  Plus,
  Search,
  Trash2,
  FileText,
  Code,
  Terminal,
} from "lucide-react";

// Map language -> icon
const LanguageIcon: Record<string, React.FC<any>> = {
  javascript: Code,
  typescript: Code,
  python: Terminal,
  java: FileText,
  c: Code,
  cpp: Code,
  go: Terminal,
  ruby: Terminal,
};

const StatusBadge: React.FC<{ type?: string | ReviewStatus }> = ({ type }) => {
  switch (type) {
    case ReviewStatus.COMPLETED:
      return (
        <span className="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400 border border-green-500/20">
          Completed
        </span>
      );
    case ReviewStatus.ERROR:
      return (
        <span className="inline-flex items-center rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300 border border-red-500/20">
          Error
        </span>
      );
    case ReviewStatus.ANALYZING:
      return (
        <span className="inline-flex items-center rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-300 border border-yellow-500/20">
          Analyzing
        </span>
      );
    default:
      return null;
  }
};

const MetricCard: React.FC<{ label: string; value: number; color?: string }> = ({
  label,
  value,
  color,
}) => {
  const colorMap: Record<string, string> = {
    green: "text-green-400",
    yellow: "text-yellow-300",
    red: "text-red-400",
  };
  return (
    <div className="bg-[#151922] rounded-xl p-5 flex flex-col items-start shadow-lg shadow-black/20">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`text-2xl font-bold mt-1 ${color ? colorMap[color] : ""}`}>
        {value}
      </span>
    </div>
  );
};

const HistoryPage: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewReview, setViewReview] = useState<ReviewItem | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("reviewHistory");
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch {
        setReviews([]);
      }
    }
  }, []);

  const saveReviews = (updated: ReviewItem[]) => {
    setReviews(updated);
    localStorage.setItem("reviewHistory", JSON.stringify(updated));
  };

  const filtered = reviews.filter(
    (r) =>
      (r.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (r.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const metrics = useMemo(() => {
    const total = reviews.length;
    const completed = reviews.filter((r) => r.type === ReviewStatus.COMPLETED).length;
    const analyzing = reviews.filter((r) => r.type === ReviewStatus.ANALYZING).length;
    const error = reviews.filter((r) => r.type === ReviewStatus.ERROR).length;
    return { total, completed, analyzing, error };
  }, [reviews]);

  const handleDelete = (idx: number) => {
    const updated = [...reviews];
    updated.splice(idx, 1);
    saveReviews(updated);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0E14] text-white">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 flex flex-col p-8 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-1">Review History</h1>
            <p className="text-gray-400 text-sm">
              Track all your AI-powered code reviews with detailed insights.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search reviews..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1A1F2B] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
            <button
              onClick={() => navigate("/review")}
              className="flex items-center gap-2 bg-primary text-black px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} /> New Review
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <MetricCard label="Total Reviews" value={metrics.total} />
          <MetricCard label="Completed" value={metrics.completed} color="green" />
          <MetricCard label="Analyzing" value={metrics.analyzing} color="yellow" />
          <MetricCard label="Errors" value={metrics.error} color="red" />
        </div>

        {/* Review Cards */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.length > 0 ? (
              filtered.map((r, idx) => {
                const Icon = r.language
                  ? LanguageIcon[r.language.toLowerCase()] || Code
                  : Code;

                return (
                  <div
                    key={idx}
                    className="bg-[#151922] rounded-xl shadow-lg shadow-black/20 p-4 flex flex-col justify-between hover:shadow-xl hover:shadow-primary/30 transition-shadow group relative"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {Icon && <Icon className="w-5 h-5 text-primary" />}
                      <h2 className="text-lg font-bold truncate">{r.title || "Untitled"}</h2>
                    </div>

                    {/* Truncated description with code handling */}
                    <div className="text-sm max-h-28 overflow-hidden relative">
                      {r.description
                        ?.split(/```[\s\S]*?```|[\n]{2,}/g)
                        .slice(0, 2)
                        .map((part, i) => {
                          const isCode = part.trim().startsWith("```");
                          if (isCode) {
                            const codeContent = part.replace(/```[\w]*\n?/, "").replace(/```/, "");
                            return (
                              <pre
                                key={i}
                                className="bg-[#101322] rounded p-2 text-xs overflow-x-auto mb-1"
                              >
                                {codeContent}
                              </pre>
                            );
                          }
                          return (
                            <p
                              key={i}
                              className="text-gray-400 text-sm mb-1 whitespace-pre-wrap break-words"
                            >
                              {part}
                            </p>
                          );
                        })}
                      {r.description?.split(/```[\s\S]*?```|[\n]{2,}/g).length > 2 && (
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#151922] to-transparent" />
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <StatusBadge type={r.type} />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewReview(r)}
                          className="px-3 py-1 text-xs font-semibold bg-[#2A2F45] rounded hover:bg-primary hover:text-white transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs font-semibold bg-red-600 rounded hover:bg-red-500 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 text-gray-400">
                No reviews found.
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {viewReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-[#151922] p-6 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
              <button
                onClick={() => setViewReview(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                Close
              </button>

              <h2 className="text-xl font-bold mb-4">{viewReview.title || "Untitled Review"}</h2>

              {viewReview.description?.split(/```[\s\S]*?```|[\n]{2,}/g).map((part, idx) => {
                const isCode = part.trim().startsWith("```");
                if (isCode) {
                  const codeContent = part.replace(/```[\w]*\n?/, "").replace(/```/, "");
                  return (
                    <pre
                      key={idx}
                      className="bg-[#101322] p-4 rounded text-sm overflow-x-auto mb-4"
                    >
                      <code>{codeContent}</code>
                    </pre>
                  );
                }
                return (
                  <p key={idx} className="text-gray-400 mb-4 whitespace-pre-wrap break-words">
                    {part}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
