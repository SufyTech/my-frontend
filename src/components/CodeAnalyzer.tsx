import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Copy,
  AlertTriangle,
  ShieldAlert,
  Bug,
  Wand2,
} from "lucide-react";

export enum ReviewStatus {
  IDLE = "IDLE",
  ANALYZING = "ANALYZING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}

export enum IssueType {
  BUG = "bug",
  SECURITY = "security",
  PERFORMANCE = "performance",
  OTHER = "other",
}

export interface ReviewResult {
  summary: string;
  issues: {
    type: IssueType;
    severity: string;
    line?: number;
    message: string;
  }[];
  optimizedCode?: string;
  score: number;
}

const INITIAL_CODE = `// Sample flawed JavaScript code
function processUserData(users) {
  let results = [];
  
  for (var i = 0; i < users.length; i++) {
    const query = "SELECT * FROM data WHERE id = " + users[i].id;
    
    if (users[i].active == true) {
      results.push(users[i]);
    }
  }
  
  return results;
}`;

// Mock analyzeCode function
const mockAnalyzeCode = async (code: string): Promise<ReviewResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary:
          "Your code works, but there are some security and performance issues.",
        issues: [
          {
            type: IssueType.SECURITY,
            severity: "high",
            line: 5,
            message: "Potential SQL injection risk with string concatenation.",
          },
          {
            type: IssueType.PERFORMANCE,
            severity: "medium",
            line: 3,
            message:
              "Consider using let/const instead of var for block scoping.",
          },
        ],
        optimizedCode: `function processUserData(users) {
  return users.filter(u => u.active);
}`,
        score: 78,
      });
    }, 1000); // simulate network delay
  });
};

const CodeAnalyzer: React.FC = () => {
  const [code, setCode] = useState(INITIAL_CODE);
  const [status, setStatus] = useState<ReviewStatus>(ReviewStatus.IDLE);
  const [result, setResult] = useState<ReviewResult | null>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setStatus(ReviewStatus.ANALYZING);
    try {
      const analysis = await mockAnalyzeCode(code);
      setResult(analysis);
      setStatus(ReviewStatus.COMPLETED);
    } catch (error) {
      setStatus(ReviewStatus.ERROR);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      default:
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    }
  };

  const getIssueIcon = (type: IssueType) => {
    switch (type) {
      case IssueType.BUG:
        return <Bug className="w-4 h-4" />;
      case IssueType.SECURITY:
        return <ShieldAlert className="w-4 h-4" />;
      case IssueType.PERFORMANCE:
        return <Wand2 className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <section id="demo" className="py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            Live Demo
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Try CodeMind AI Now
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Paste your code snippet below and let our Gemini-powered engine
            analyze it for improvements.
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
          {/* Editor */}
          <div className="flex flex-col glass-card rounded-2xl overflow-hidden border border-slate-800">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500">
                editor.js
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCode(INITIAL_CODE)}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-400 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-400 transition-colors"
                  onClick={() => navigator.clipboard.writeText(code)}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-slate-950 p-6 font-mono text-sm text-slate-300 resize-none focus:outline-none leading-relaxed custom-scrollbar"
            />

            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <button
                onClick={handleAnalyze}
                disabled={status === ReviewStatus.ANALYZING}
                className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white py-3 rounded-lg font-medium transition-all shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {status === ReviewStatus.ANALYZING ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Analyze Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col glass-card rounded-2xl overflow-hidden border border-slate-800 relative">
            {!result && status !== ReviewStatus.ANALYZING && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-950/50 backdrop-blur-sm">
                <Wand2 className="w-12 h-12 mb-4 opacity-50" />
                <p>Run analysis to see insights</p>
              </div>
            )}

            {status === ReviewStatus.ANALYZING && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-violet-400 bg-slate-950/80 backdrop-blur-sm">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-violet-500/30 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 border-4 border-t-violet-500 rounded-full animate-spin"></div>
                </div>
                <p className="animate-pulse font-medium">
                  Gemini is reviewing your code...
                </p>
              </div>
            )}

            <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-semibold text-white">Analysis Results</h3>
              {result && (
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    result.score >= 90
                      ? "bg-green-500/20 text-green-400"
                      : result.score >= 70
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  Score: {result.score}/100
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {result && (
                <div className="space-y-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                      Summary
                    </h4>
                    <p className="text-slate-200 text-sm">{result.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                      Issues Found ({result.issues.length})
                    </h4>
                    <div className="space-y-3">
                      {result.issues.map((issue, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border flex items-start gap-3 ${getSeverityColor(
                            issue.severity
                          )}`}
                        >
                          <div className="mt-0.5 opacity-80">
                            {getIssueIcon(issue.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-sm capitalize">
                                {issue.type}
                              </span>
                              {issue.line && (
                                <span className="text-xs opacity-70 font-mono">
                                  Ln {issue.line}
                                </span>
                              )}
                            </div>
                            <p className="text-sm mt-1 opacity-90">
                              {issue.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.optimizedCode && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                        Suggested Fix
                      </h4>
                      <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
                        <div className="p-4 overflow-x-auto">
                          <pre className="font-mono text-xs text-green-400">
                            {result.optimizedCode}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeAnalyzer;
