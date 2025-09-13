import React, { useState, useEffect } from 'react';
import { DashboardProps, TestResult } from '../types';

const Dashboard: React.FC<DashboardProps> = ({ scramble, loading, generateScramble }) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [stats, setStats] = useState([
    { label: 'Total Tests', value: '0' },
    { label: 'Success Rate', value: '0%' },
    { label: 'Avg. Moves', value: '0' },
    { label: 'Best Time', value: 'N/A' },
  ]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/results');
        const data: TestResult[] = await response.json();
        setResults(data);

        if (data.length > 0) {
          const totalTests = data.length;
          const successfulTests = data.filter(r => r.isSolved);
          const successRate = totalTests > 0 ? (successfulTests.length / totalTests) * 100 : 0;
          const avgMoves = totalTests > 0 ? data.reduce((acc, r) => acc + r.moveCount, 0) / totalTests : 0;
          const bestTime = successfulTests.length > 0 ? Math.min(...successfulTests.map(r => r.solveTime)) / 1000 : null;

          setStats([
            { label: 'Total Tests', value: totalTests.toString() },
            { label: 'Success Rate', value: `${successRate.toFixed(1)}%` },
            { label: 'Avg. Moves', value: avgMoves.toFixed(1) },
            { label: 'Best Time', value: bestTime ? `${bestTime.toFixed(2)}s` : 'N/A' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch results for dashboard', error);
      }
    };

    fetchResults();
  }, []);

  const recentResults = results.slice(-5).reverse();

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
                {recentResults.length > 0 ? (
          <table className="recent-tests-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Status</th>
                <th>Moves</th>
                <th>Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.map((result) => (
                <tr key={result.id} className={result.isSolved ? 'success' : 'error'}>
                  <td>{result.model}</td>
                  <td>{result.isSolved ? '✅ Success' : '❌ Failed'}</td>
                  <td>{result.moveCount}</td>
                  <td>{(result.solveTime / 1000).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="placeholder-content">
            <p>Recent test results will appear here</p>
            <p>Run some tests to see the data!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
