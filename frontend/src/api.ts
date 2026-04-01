import { Issue } from "./types";

const BASE = import.meta.env.VITE_API_URL || "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error || res.statusText);
  }
  return res.json();
}

export const api = {
  listIssues: () => request<Issue[]>("/api/issues"),
  getIssue: (id: number) => request<Issue>(`/api/issues/${id}`),
  createIssue: (data: Partial<Issue>) =>
    request<Issue>("/api/issues", { method: "POST", body: JSON.stringify(data) }),
  updateIssue: (id: number, data: Partial<Issue>) =>
    request<Issue>(`/api/issues/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteIssue: (id: number) =>
    request<{ deleted: boolean }>(`/api/issues/${id}`, { method: "DELETE" }),
};
