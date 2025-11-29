import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  XAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { ReviewItem } from "../../types";
import { getReviewScore } from "../../utils";

interface QualityChartProps {
  reviewData: ReviewItem[];
}

const QualityChart: React.FC<QualityChartProps> = ({ reviewData }) => {
  const CHART_DATA = reviewData.map((r, idx) => ({
    name: `Review ${idx + 1}`,
    value: getReviewScore(r),
  }));

  const latestValue = CHART_DATA.length
    ? CHART_DATA[CHART_DATA.length - 1].value
    : 0;
  const prevValue =
    CHART_DATA.length > 1
      ? CHART_DATA[CHART_DATA.length - 2].value
      : latestValue;
  const diff = latestValue - prevValue;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border-dark p-6 bg-surface-dark h-full min-h-[300px]">
      {/* Header */}
      <div className="flex flex-col">
        <p className="text-text-secondary-dark text-sm font-medium leading-normal">
          Code Quality Over Time
        </p>
        <div className="flex items-baseline gap-2">
          <p className="text-text-primary-dark tracking-tight text-3xl font-bold leading-tight">
            {latestValue}%
          </p>
          <p
            className={`text-sm font-medium leading-normal flex items-center gap-1 ${
              diff >= 0 ? "text-success" : "text-danger"
            }`}
          >
            <TrendingUp size={16} />
            {diff >= 0 ? `+${diff}` : diff}
          </p>
        </div>
        <p className="text-text-secondary-dark text-sm font-normal leading-normal mt-1">
          Last {reviewData.length} Reviews
        </p>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-[180px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={CHART_DATA}>
            <defs>
              <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis hide domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderColor: "#374151",
                borderRadius: "0.5rem",
                color: "#F9FAFB",
              }}
              itemStyle={{ color: "#A78BFA" }}
              labelStyle={{ color: "#9CA3AF" }}
              cursor={{ stroke: "#4B5563", strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorQuality)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Custom X Axis labels */}
      <div className="flex justify-between pt-2 border-t border-border-dark">
        {CHART_DATA.map((d, idx) => (
          <p key={idx} className="text-text-secondary-dark text-xs font-bold">
            {d.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default QualityChart;
