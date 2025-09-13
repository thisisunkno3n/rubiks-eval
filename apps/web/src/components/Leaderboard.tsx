import { useState, useEffect } from 'react';
import { TestResult } from '../types';
import LeaderboardChart from './LeaderboardChart';

const Leaderboard: React.FC = () => {
    const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof TestResult>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/results');
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        const data = await response.json();
        setResults(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const sortedResults = [...results].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === bValue) return 0;
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    return aValue > bValue ? direction : -direction;
  });

  const handleSort = (field: keyof TestResult) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format timestamp for display
    if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>Model Leaderboard</h2>
      </div>
      
      <div className="charts-container" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <LeaderboardChart data={results} metric="Avg Solve Time (s)" />
        <LeaderboardChart data={results} metric="Avg Moves" />
        <LeaderboardChart data={results} metric="Success Rate (%)" />
      </div>

      <div className="leaderboard-table card">
        <h3 style={{ marginBottom: '1.5rem', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>All Results</h3>
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th 
                onClick={() => handleSort('timestamp')}
                className="sortable"
              >
                Date {sortField === 'timestamp' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Status</th>
              <th 
                onClick={() => handleSort('moveCount')}
                className="sortable"
              >
                Moves {sortField === 'moveCount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                onClick={() => handleSort('solveTime')}
                className="sortable"
              >
                Time (s) {sortField === 'solveTime' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result) => (
              <tr key={result.id} className={result.isSolved ? 'success' : 'error'}>
                <td>{result.model}</td>
                <td>{formatDate(result.timestamp)}</td>
                <td>{result.isSolved ? '✅ Success' : '❌ Failed'}</td>
                <td>{result.moveCount}</td>
                <td>{(result.solveTime / 1000).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
