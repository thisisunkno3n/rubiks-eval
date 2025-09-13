import { useState } from 'react';
import { TestResult, LeaderboardProps } from '../types';
import LeaderboardChart from './LeaderboardChart';

const Leaderboard: React.FC<LeaderboardProps> = ({ results = [] }) => {
  const [sortField, setSortField] = useState<keyof TestResult>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Mock data - in a real app, this would come from props
  const mockResults: TestResult[] = [
    {
      id: '1',
      model: 'Cohere',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      scramble: 'R U R\' U\' R\' F R2 U\' R\' U\' R U R\' F\'',
      solution: 'U R U R\' U R U2 R\'',
      isSolved: true,
      solveTime: 1200, // ms
      moveCount: 7
    },
    {
      id: '2',
      model: 'Gemini',
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      scramble: 'F R U R\' U\' F\' f R U R\' U\' f\'',
      solution: 'U R U R\' U\' R\' F R F\'',
      isSolved: false,
      solveTime: 1800, // ms
      moveCount: 9
    },
    {
      id: '3',
      model: 'Cohere',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      scramble: 'R U R\' U\' M\' U R U\' r\'',
      solution: 'U R U R\' U R U2 R\'',
      isSolved: true,
      solveTime: 950,
      moveCount: 6
    },
    {
      id: '4',
      model: 'Gemini',
      timestamp: new Date(Date.now() - 90000000).toISOString(), // ~25 hours ago
      scramble: 'F R U R\' U\' F\'',
      solution: 'F U R U\' R\' F\'',
      isSolved: true,
      solveTime: 2200,
      moveCount: 6
    },
    {
      id: '5',
      model: 'Claude',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      scramble: 'L U2 R\' U2 L\' U2 R',
      solution: 'R\' U2 L U2 R U2 L\'',
      isSolved: true,
      solveTime: 1500,
      moveCount: 7
    },
    {
      id: '6',
      model: 'Claude',
      timestamp: new Date(Date.now() - 180000000).toISOString(), // ~50 hours ago
      scramble: 'R U R\' F\' R U R\' U\' R\' F R2 U\' R\'',
      solution: '', // Failed solve
      isSolved: false,
      solveTime: 3000,
      moveCount: 12
    },
    ...(results || [])
  ];

  // Sort results based on selected field and direction
  const sortedResults = [...mockResults].sort((a, b) => {
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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>Model Leaderboard</h2>
      </div>
      
      <div className="charts-container" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <LeaderboardChart data={mockResults} metric="Avg Solve Time (s)" />
        <LeaderboardChart data={mockResults} metric="Avg Moves" />
        <LeaderboardChart data={mockResults} metric="Success Rate (%)" />
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
