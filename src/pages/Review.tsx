import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import AnalysisPanel from "../components/AnalysisPanel";
import axios from "axios";

const Review: React.FC = () => {
  const [code, setCode] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveToHistory = (code: string, aiReviews: any[]) => {
    const stored = localStorage.getItem("reviewHistory");
    const history: any[] = stored ? JSON.parse(stored) : [];

    const mappedReviews = aiReviews.map((r: any, idx: number) => ({
      id: Date.now().toString() + "-" + idx,
      title: r.title || `Code Review ${idx + 1}`,
      description: r.description || "No description available",
      codeSuggestion: r.codeSuggestion || code,
      type: r.type || "ANALYZING",
      timestamp: new Date().toLocaleString(),
    }));

    history.unshift(...mappedReviews);
    localStorage.setItem("reviewHistory", JSON.stringify(history.slice(0, 50)));
  };

  const submitCode = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");

      const response = await axios.post(
        "http://localhost:5000/ai/get-review",
        { code },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;
      setAnalysisResult(result);

      if (result?.reviews) {
        saveToHistory(code, result.reviews);
      }
    } catch (err: any) {
      console.error("Review Error:", err.response || err.message);
      setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header removed */}

        <div className="flex flex-col md:flex-row flex-1 p-4 md:p-6 gap-4 md:gap-6">
          {/* Code Editor */}
          <div className="w-full md:w-1/2 h-[400px] md:h-auto">
            <CodeEditor
              code={code}
              onChange={setCode}
              onSubmit={submitCode}
              isAnalyzing={isLoading}
            />
          </div>

          {/* Analysis Panel */}
          <div className="w-full md:w-1/2 h-[400px] md:h-auto">
            <AnalysisPanel
              isLoading={isLoading}
              error={error}
              result={analysisResult}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
