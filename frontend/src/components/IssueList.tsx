import { Issue, IssueStatus } from "../types";
import StatusIcon from "./StatusIcon";
import PriorityIcon from "./PriorityIcon";
import "./IssueList.css";

interface IssueListProps {
  issues: Issue[];
  activeTab: "all" | "active" | "backlog";
  onTabChange: (tab: "all" | "active" | "backlog") => void;
  onSelectIssue: (issue: Issue) => void;
  onCreateClick: () => void;
}

const STATUS_ORDER: IssueStatus[] = ["in_progress", "todo", "backlog", "done", "cancelled"];
const STATUS_LABELS: Record<IssueStatus, string> = {
  in_progress: "In Progress",
  todo: "Todo",
  backlog: "Backlog",
  done: "Done",
  cancelled: "Cancelled",
};

export default function IssueList({ issues, activeTab, onTabChange, onSelectIssue, onCreateClick }: IssueListProps) {
  const grouped = STATUS_ORDER.map((status) => ({
    status,
    issues: issues.filter((i) => i.status === status),
  })).filter((g) => g.issues.length > 0);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="issue-list-container">
      <div className="issue-list-header">
        <div className="issue-list-header-left">
          <span className="team-icon-header">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect width="18" height="18" rx="4" fill="#4ade80" />
              <text x="9" y="13" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">M</text>
            </svg>
          </span>
          <span className="team-name-header">Mc-namara</span>
        </div>
        <div className="issue-list-header-right">
          <button className="icon-btn" title="Filter">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn" title="Display">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 4h10M3 8h10M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn" onClick={onCreateClick} title="Create issue">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="issue-list-tabs">
        {(["all", "active", "backlog"] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab === "all" ? "All Issues" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <button className="icon-btn tab-settings-btn" title="Settings">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="issue-list-body">
        {grouped.map(({ status, issues: groupIssues }) => (
          <div key={status} className="issue-group">
            <div className="issue-group-header">
              <button className="group-collapse-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <StatusIcon status={status} />
              <span className="group-label">{STATUS_LABELS[status]}</span>
              <span className="group-count">{groupIssues.length}</span>
              <button className="group-add-btn" onClick={onCreateClick} title="Add issue">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            {groupIssues.map((issue) => (
              <div
                key={issue.id}
                className="issue-row"
                onClick={() => onSelectIssue(issue)}
              >
                <div className="issue-row-left">
                  <button className="issue-menu-btn" onClick={(e) => e.stopPropagation()}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="4" cy="8" r="1" fill="currentColor"/>
                      <circle cx="8" cy="8" r="1" fill="currentColor"/>
                      <circle cx="12" cy="8" r="1" fill="currentColor"/>
                    </svg>
                  </button>
                  <span className="issue-identifier">{issue.identifier}</span>
                  <StatusIcon status={issue.status} />
                  <span className="issue-title">{issue.title}</span>
                </div>
                <div className="issue-row-right">
                  <PriorityIcon priority={issue.priority} />
                  <span className="issue-assignee-avatar" title={issue.assignee || "Unassigned"}>
                    {issue.assignee ? (
                      issue.assignee.charAt(0).toUpperCase()
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M3 15c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </span>
                  <span className="issue-date">{formatDate(issue.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
