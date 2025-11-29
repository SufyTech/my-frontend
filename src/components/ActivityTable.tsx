import React from "react";
import { RepoStatus } from "../../types";

interface Activity {
  id: string;
  name: string;
  status: RepoStatus;
  date: string;
  issuesCount: number | null;
}

interface ActivityTableProps {
  searchTerm: string;
  activities: Activity[]; // now receives actual user activity
}

const ActivityTable: React.FC<ActivityTableProps> = ({
  searchTerm,
  activities,
}) => {
  const filteredActivity = activities.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  const getStatusStyle = (status: RepoStatus) => {
    switch (status) {
      case RepoStatus.COMPLETED:
        return "bg-success/10 text-success";
      case RepoStatus.IN_PROGRESS:
        return "bg-secondary/10 text-secondary";
      case RepoStatus.FAILED:
        return "bg-danger/10 text-danger";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusDot = (status: RepoStatus) => {
    switch (status) {
      case RepoStatus.COMPLETED:
        return "bg-success";
      case RepoStatus.IN_PROGRESS:
        return "bg-secondary";
      case RepoStatus.FAILED:
        return "bg-danger";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-surface-dark border border-border-dark p-6 h-full">
      <h3 className="text-text-primary-dark text-lg font-bold">
        Recent Activity
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-dark">
              <th className="py-3 px-4 text-sm font-semibold text-text-secondary-dark">
                Repository
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-text-secondary-dark">
                Status
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-text-secondary-dark">
                Date
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-text-secondary-dark text-right">
                Issues
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredActivity.length > 0 ? (
              filteredActivity.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border-dark/50 last:border-0 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-text-primary-dark">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${getStatusDot(
                          item.status
                        )}`}
                      ></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-text-secondary-dark">
                    {item.date}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-text-primary-dark text-right">
                    {item.issuesCount !== null ? item.issuesCount : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-text-secondary-dark text-sm"
                >
                  No activity yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
