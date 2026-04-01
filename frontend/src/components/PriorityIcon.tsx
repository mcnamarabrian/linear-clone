import { IssuePriority } from "../types";

export default function PriorityIcon({ priority, size = 16 }: { priority: IssuePriority; size?: number }) {
  if (priority === "urgent") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M3 13V3.5L8 1l5 2.5V13l-5-2-5 2z" fill="#ef4444" stroke="#ef4444" strokeWidth="1"/>
      </svg>
    );
  }
  if (priority === "high") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="8" width="3" height="6" rx="0.5" fill="#f97316"/>
        <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="#f97316"/>
        <rect x="11.5" y="2" width="3" height="12" rx="0.5" fill="#f97316"/>
      </svg>
    );
  }
  if (priority === "medium") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="8" width="3" height="6" rx="0.5" fill="#f59e0b"/>
        <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="#f59e0b"/>
        <rect x="11.5" y="2" width="3" height="12" rx="0.5" fill="#d1d5db"/>
      </svg>
    );
  }
  if (priority === "low") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="8" width="3" height="6" rx="0.5" fill="#6b7280"/>
        <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="#d1d5db"/>
        <rect x="11.5" y="2" width="3" height="12" rx="0.5" fill="#d1d5db"/>
      </svg>
    );
  }
  // no_priority — compact stacked bars
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 4h8M4 7h8M4 10h8M4 13h8" stroke="#d1d5db" strokeWidth="1.3" />
    </svg>
  );
}
