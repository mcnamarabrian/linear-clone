import { IssueStatus } from "../types";

const statusConfig: Record<IssueStatus, { color: string; filled: boolean; dash?: boolean }> = {
  backlog: { color: "#9ca3af", filled: false, dash: true },
  todo: { color: "#9ca3af", filled: false },
  in_progress: { color: "#f59e0b", filled: true },
  done: { color: "#5e6ad2", filled: true },
  cancelled: { color: "#6b7280", filled: true },
};

export default function StatusIcon({ status, size = 14 }: { status: IssueStatus; size?: number }) {
  const cfg = statusConfig[status];
  const r = size / 2 - 1.5;
  const cx = size / 2;
  const cy = size / 2;

  if (cfg.filled && status === "done") {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle cx={cx} cy={cy} r={r} fill={cfg.color} />
        <path
          d={`M${cx - 2.5} ${cy} l2 2 3.5-3.5`}
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (cfg.filled && status === "cancelled") {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle cx={cx} cy={cy} r={r} fill={cfg.color} />
        <path d={`M${cx - 2} ${cy - 2} l4 4 M${cx + 2} ${cy - 2} l-4 4`} stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }

  if (status === "in_progress") {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle cx={cx} cy={cy} r={r} stroke={cfg.color} strokeWidth="1.5" />
        <path
          d={`M${cx} ${cy - r} A${r} ${r} 0 1 1 ${cx - r} ${cy}`}
          fill={cfg.color}
        />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={cfg.color}
        strokeWidth="1.5"
        strokeDasharray={cfg.dash ? "2 2" : undefined}
      />
    </svg>
  );
}
