import { useState, useEffect, useCallback } from "react";
import { Issue } from "./types";
import { api } from "./api";
import Sidebar from "./components/Sidebar";
import IssueList from "./components/IssueList";
import IssueDetail from "./components/IssueDetail";
import CreateIssueModal from "./components/CreateIssueModal";
import "./styles/App.css";

export default function App() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "backlog">("all");

  const fetchIssues = useCallback(async () => {
    const data = await api.listIssues();
    setIssues(data);
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const handleSelectIssue = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleBack = () => {
    setSelectedIssue(null);
    fetchIssues();
  };

  const handleCreate = async (data: Partial<Issue>) => {
    await api.createIssue(data);
    setShowCreate(false);
    fetchIssues();
  };

  const handleUpdate = async (id: number, data: Partial<Issue>) => {
    const updated = await api.updateIssue(id, data);
    setSelectedIssue(updated);
    fetchIssues();
  };

  const handleDelete = async (id: number) => {
    await api.deleteIssue(id);
    setSelectedIssue(null);
    fetchIssues();
  };

  const filteredIssues = issues.filter((issue) => {
    if (activeTab === "active") return issue.status === "in_progress" || issue.status === "todo";
    if (activeTab === "backlog") return issue.status === "backlog";
    return true;
  });

  return (
    <div className="app-layout">
      <Sidebar onCreateClick={() => setShowCreate(true)} />
      <main className="main-content">
        {selectedIssue ? (
          <IssueDetail
            issue={selectedIssue}
            onBack={handleBack}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ) : (
          <IssueList
            issues={filteredIssues}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSelectIssue={handleSelectIssue}
            onCreateClick={() => setShowCreate(true)}
          />
        )}
      </main>
      {showCreate && (
        <CreateIssueModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
