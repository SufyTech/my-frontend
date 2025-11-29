// -------------------- USER & REPO --------------------

// types.ts
export interface User {
  name: string;
  email: string;      // required for backend
  avatarUrl: string;  // frontend uses this
}


export enum RepoStatus {
  COMPLETED = "Completed",
  IN_PROGRESS = "In Progress",
  FAILED = "Failed",
}

export interface RepositoryActivity {
  id: string;
  name: string;
  status: RepoStatus;
  date: string;
  issuesCount: number | null;
}

export interface StatMetric {
  label: string;
  value: string | number;
  change: number;
  suffix?: string;
  trend: "up" | "down";
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  iconName: string;
  isCompleted: boolean;
  actionLabel: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

// -------------------- CODE REVIEW TYPES --------------------

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

export interface Issue {
  type: IssueType;
  severity: "low" | "medium" | "high";
  message: string;
  line?: number;
}

// Legacy format for AI results
export interface ReviewResult {
  score: number;
  summary: string;
  issues: Issue[];
  optimizedCode?: string;
}

export enum ReviewType {
  SECURITY = "Security",
  PERFORMANCE = "Performance",
  BUG = "Bug",
  BEST_PRACTICE = "Best Practice",
}

// -------------------- FINAL REVIEW ITEM --------------------

export interface ReviewItem {
  // Core fields
  code: string;
  result: AnalysisResult;
  status: ReviewStatus | string;  // Can accept legacy string
  createdAt: string;

  // Frontend helpers
  language: string;
  title?: string;       // Displayed in ActivityTable
  description?: string; // Optional description
  type?: ReviewType | string;
  codeSuggestion?: string;
}

// -------------------- AI RESPONSE TYPES --------------------

export interface StructuredAIResult {
  issues: string[];
  improvements: string[];
  recommendedFix: string;
  finalNote?: string;
}

export interface RawAIResult {
  finalNote: string;
}

export interface ReviewsArrayResult {
  reviews: ReviewItem[];
}

// Union type for any AI analysis
export interface AnalysisResult {
  reviews: ReviewItem[];
}
