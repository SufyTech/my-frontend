import React from "react";

interface StatusBadgeProps {
  type: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type }) => {
  let bgColor = "bg-gray-500";
  if (type === "Good") bgColor = "bg-green-500";
  else if (type === "Warning") bgColor = "bg-yellow-500";
  else if (type === "Bad") bgColor = "bg-red-500";

  return (
    <span className={`${bgColor} text-white text-xs px-2 py-1 rounded`}>
      {type}
    </span>
  );
};
