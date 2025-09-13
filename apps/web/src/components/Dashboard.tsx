import React from 'react';
import { DashboardProps } from '../types';

const Dashboard: React.FC<DashboardProps> = ({ scramble, loading, generateScramble }) => {
  // Mock data - will be replaced with actual data later
  const stats = [
    { label: 'Total Tests', value: '24' },
    { label: 'Success Rate', value: '83%' },
    { label: 'Avg. Moves', value: '12.4' },
    { label: 'Best Time', value: '2.3s' },
  ];

  return (
    <div className="dashboard">
      <section className="scramble-section">
        <h2>Generate New Scramble</h2>
        <button 
          onClick={generateScramble} 
          className="generate-btn"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Scramble'}
        </button>
        
        {scramble && (
          <div className="scramble-display">
            <h3>Current Scramble:</h3>
            <code className="scramble-text">{scramble}</code>
          </div>
        )}
      </section>

      <section className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="recent-tests">
        <h2>Recent Tests</h2>
        <div className="placeholder-content">
          <p>Recent test results will appear here</p>
          <p>Run some tests to see the data!</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
