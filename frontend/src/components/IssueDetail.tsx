import { useState } from "react";
import { Issue, IssueStatus, IssuePriority } from "../types";
import StatusIcon from "./StatusIcon";
import PriorityIcon from "./PriorityIcon";
import "./IssueDetail.css";

interface IssueDetailProps {
  issue: Issue;
  onBack: () => void;
  onUpdate: (id: number, data: Partial<Issue>) => void;
  onDelete: (id: number) => void;
}

const STATUSES: IssueStatus[] = ["backlog", "todo", "in_progress", "done", "cancelled"];
const STATUS_LABELS: Record<IssueStatus, string> = {
  backlog: "Backlog",
  todo: "Todo",
  in_progress: "In Progress",
  done: "Done",
  cancelled: "Cancelled",
};

const PRIORITIES: IssuePriority[] = ["no_priority", "urgent", "high", "medium", "low"];
const PRIORITY_LABELS: Record<IssuePriority, string> = {
  no_priority: "No priority",
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function IssueDetail({ issue, onBack, onUpdate, onDelete }: IssueDetailProps) {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleTitleBlur = () => {
    if (title !== issue.title && title.trim()) {
      onUpdate(issue.id, { title });
    }
  };

  const handleDescBlur = () => {
    if (description !== issue.description) {
      onUpdate(issue.id, { description });
    }
  };

  return (
    <div className="issue-detail">
      <div className="issue-detail-topbar">
        <div className="issue-detail-topbar-left">
          <button className="icon-btn" onClick={onBack} title="Back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="issue-detail-id">{issue.identifier}</span>
          <span className="issue-detail-title-breadcrumb">{issue.title}</span>
        </div>
        <div className="issue-detail-topbar-right">
          <button className="icon-btn" title="Copy link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.5 9.5l3-3M5.5 7.5L4 9a2.83 2.83 0 004 4l1.5-1.5M10.5 8.5L12 7a2.83 2.83 0 00-4-4L6.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="icon-btn" title="Copy ID">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="2" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M3 5v8a1.5 1.5 0 001.5 1.5H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn" title="Git branch">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="11" cy="6" r="2" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5 6v4M7 5l2 0.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn" onClick={() => setShowDeleteConfirm(true)} title="Delete issue">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 3V2a1 1 0 011-1h4a1 1 0 011 1v1M3 4h10M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="icon-btn" title="More">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="4" cy="8" r="1.2" fill="currentColor"/>
              <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
              <circle cx="12" cy="8" r="1.2" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-bar">
          <span>Delete this issue?</span>
          <button className="delete-confirm-btn" onClick={() => onDelete(issue.id)}>Delete</button>
          <button className="delete-cancel-btn" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
        </div>
      )}

      <div className="issue-detail-body">
        <div className="issue-detail-main">
          <input
            className="issue-detail-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="Issue title"
          />
          <textarea
            className="issue-detail-desc-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleDescBlur}
            placeholder="Add description..."
            rows={6}
          />
        </div>

        <aside className="issue-detail-sidebar">
          <div className="detail-sidebar-section">
            <div className="detail-sidebar-label">Properties</div>

            <div className="detail-property">
              <div className="detail-property-row" onClick={() => setShowStatusMenu(!showStatusMenu)}>
                <StatusIcon status={issue.status} />
                <span>{STATUS_LABELS[issue.status]}</span>
              </div>
              {showStatusMenu && (
                <div className="dropdown-menu">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      className={`dropdown-item ${issue.status === s ? "active" : ""}`}
                      onClick={() => {
                        onUpdate(issue.id, { status: s });
                        setShowStatusMenu(false);
                      }}
                    >
                      <StatusIcon status={s} />
                      <span>{STATUS_LABELS[s]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="detail-property">
              <div className="detail-property-row" onClick={() => setShowPriorityMenu(!showPriorityMenu)}>
                <PriorityIcon priority={issue.priority} />
                <span>{issue.priority === "no_priority" ? "Set priority" : PRIORITY_LABELS[issue.priority]}</span>
              </div>
              {showPriorityMenu && (
                <div className="dropdown-menu">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      className={`dropdown-item ${issue.priority === p ? "active" : ""}`}
                      onClick={() => {
                        onUpdate(issue.id, { priority: p });
                        setShowPriorityMenu(false);
                      }}
                    >
                      <PriorityIcon priority={p} />
                      <span>{PRIORITY_LABELS[p]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="detail-property">
              <div className="detail-property-row">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span>{issue.assignee || "Assign"}</span>
              </div>
            </div>
          </div>

          <div className="detail-sidebar-section">
            <div className="detail-sidebar-label">Labels</div>
            <div className="detail-property">
              <div className="detail-property-row">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span>{issue.label || "Add label"}</span>
              </div>
            </div>
          </div>

          <div className="detail-sidebar-section">
            <div className="detail-sidebar-label">Project</div>
            <div className="detail-property">
              <div className="detail-property-row">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
                <span>Add to project</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
