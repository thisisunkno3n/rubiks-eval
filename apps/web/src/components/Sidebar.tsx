import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  const views: { id: ViewType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'visualizer', label: 'Cube Visualizer', icon: '🎲' },
    { id: 'test', label: 'Test Interface', icon: '🧪' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>Rubik's LLM</h2>
      </div>
      <nav>
        {views.map((view) => (
          <button
            key={view.id}
            className={`nav-item ${currentView === view.id ? 'active' : ''}`}
            onClick={() => onViewChange(view.id)}
          >
            <span className="nav-icon">{view.icon}</span>
            {view.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
