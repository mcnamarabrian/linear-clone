export type IssueStatus = "backlog" | "todo" | "in_progress" | "done" | "cancelled";
export type IssuePriority = "no_priority" | "urgent" | "high" | "medium" | "low";

export interface Issue {
  id: number;
  identifier: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string | null;
  label: string | null;
  created_at: string;
  updated_at: string;
}
