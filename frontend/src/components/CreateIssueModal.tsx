import { useState } from "react";
import { Issue, IssueStatus, IssuePriority } from "../types";
import StatusIcon from "./StatusIcon";
import PriorityIcon from "./PriorityIcon";
import "./CreateIssueModal.css";

interface CreateIssueModalProps {
  onClose: () => void;
  onCreate: (data: Partial<Issue>) => void;
}

const STATUSES: IssueStatus[] = ["backlog", "todo", "in_progress", "done"];
const STATUS_LABELS: Record<string, string> = {
  backlog: "Backlog",
  todo: "Todo",
  in_progress: "In Progress",
  done: "Done",
};

const PRIORITIES: IssuePriority[] = ["no_priority", "urgent", "high", "medium", "low"];
const PRIORITY_LABELS: Record<string, string> = {
  no_priority: "Priority",
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function CreateIssueModal({ onClose, onCreate }: CreateIssueModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<IssueStatus>("backlog");
  const [priority, setPriority] = useState<IssuePriority>("no_priority");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate({ title, description, status, priority });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-modal" onClick={(e) => e.stopPropagation()}>
        <div className="create-modal-header">
          <div className="create-modal-header-left">
            <span className="create-modal-team">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect width="16" height="16" rx="3" fill="#4ade80" />
                <text x="8" y="12" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">M</text>
              </svg>
              <span>MC</span>
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="create-modal-label">New issue</span>
          </div>
          <div className="create-modal-header-right">
            <button className="icon-btn" title="Expand">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 2H3a1 1 0 00-1 1v3M10 2h3a1 1 0 011 1v3M6 14H3a1 1 0 01-1-1v-3M10 14h3a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="icon-btn" onClick={onClose} title="Close">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="create-modal-body">
          <input
            className="create-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Issue title"
            autoFocus
          />
          <textarea
            className="create-desc-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description..."
            rows={3}
          />
          <button className="create-attach-btn" title="Attach file">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.5 4v6.5a2 2 0 004 0V5a3 3 0 00-6 0v6a4 4 0 008 0V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="create-modal-footer">
          <div className="create-modal-footer-left">
            <div className="create-field-btn-wrapper">
              <button
                className="create-field-btn"
                onClick={() => setShowStatusMenu(!showStatusMenu)}
              >
                <StatusIcon status={status} />
                <span>{STATUS_LABELS[status]}</span>
              </button>
              {showStatusMenu && (
                <div className="dropdown-menu create-dropdown">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      className={`dropdown-item ${status === s ? "active" : ""}`}
                      onClick={() => { setStatus(s); setShowStatusMenu(false); }}
                    >
                      <StatusIcon status={s} />
                      <span>{STATUS_LABELS[s]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="create-field-btn-wrapper">
              <button
                className="create-field-btn"
                onClick={() => setShowPriorityMenu(!showPriorityMenu)}
              >
                <PriorityIcon priority={priority} />
                <span>{PRIORITY_LABELS[priority]}</span>
              </button>
              {showPriorityMenu && (
                <div className="dropdown-menu create-dropdown">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      className={`dropdown-item ${priority === p ? "active" : ""}`}
                      onClick={() => { setPriority(p); setShowPriorityMenu(false); }}
                    >
                      <PriorityIcon priority={p} />
                      <span>{PRIORITY_LABELS[p]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="create-field-btn">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span>Assignee</span>
            </button>

            <button className="create-field-btn">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              <span>Labels</span>
            </button>

            <button className="create-field-btn">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="4" cy="8" r="1" fill="currentColor"/>
                <circle cx="8" cy="8" r="1" fill="currentColor"/>
                <circle cx="12" cy="8" r="1" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <div className="create-modal-footer-right">
            <label className="create-more-label">
              <input type="checkbox" className="create-more-checkbox" />
              <span>Create more</span>
            </label>
            <button
              className="create-submit-btn"
              onClick={handleSubmit}
              disabled={!title.trim()}
            >
              Create issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
