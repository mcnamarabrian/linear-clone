import "./Sidebar.css";

interface SidebarProps {
  onCreateClick: () => void;
}

export default function Sidebar({ onCreateClick }: SidebarProps) {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="workspace-selector">
          <span className="workspace-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect width="18" height="18" rx="4" fill="#4ade80" />
              <text x="9" y="13" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">M</text>
            </svg>
          </span>
          <span className="workspace-name">mc-namara</span>
          <svg className="chevron-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="sidebar-header-actions">
          <button className="icon-btn sidebar-search-btn" title="Search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn sidebar-create-btn" onClick={onCreateClick} title="Create new issue">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <a className="sidebar-item" href="#" tabIndex={0}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M2 6h12" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          <span>Inbox</span>
        </a>
        <a className="sidebar-item" href="#" tabIndex={0}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>My Issues</span>
        </a>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Workspace</div>
        <a className="sidebar-item" href="#" tabIndex={0}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          <span>Projects</span>
        </a>
        <a className="sidebar-item" href="#" tabIndex={0}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10M3 8h10M3 12h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span>Views</span>
        </a>
        <a className="sidebar-item sidebar-more" href="#" tabIndex={0}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="4" cy="8" r="1" fill="currentColor"/>
            <circle cx="8" cy="8" r="1" fill="currentColor"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
          </svg>
          <span>More</span>
        </a>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Your teams</div>
        <div className="sidebar-team">
          <span className="team-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect width="16" height="16" rx="3" fill="#4ade80" />
              <text x="8" y="12" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">M</text>
            </svg>
          </span>
          <span className="team-name">Mc-namara</span>
          <svg className="chevron-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <a className="sidebar-item sidebar-item-nested active" href="#" tabIndex={0}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          <span>Issues</span>
        </a>
        <a className="sidebar-item sidebar-item-nested" href="#" tabIndex={0}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          <span>Projects</span>
        </a>
        <a className="sidebar-item sidebar-item-nested" href="#" tabIndex={0}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10M3 8h10M3 12h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span>Views</span>
        </a>
      </div>
    </nav>
  );
}
