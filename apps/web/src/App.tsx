import { useState } from 'react';
import { ViewType } from './types';
import './App.css';

// Components
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import CubeVisualizer from './components/CubeVisualizer';
import TestInterface from './components/TestInterface';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [scramble, setScramble] = useState('');
  const [loading, setLoading] = useState(false);

  const generateScramble = async () => {
    setLoading(true)
    try {
      // This will be replaced with actual API call
      // const response = await fetch('/api/scramble');
      // const data = await response.json();
      // setScramble(data.scramble);
      
      // Mock response for now
      const mockScramble = "R U' F2 R' U F' R U R' U' F2 U R";
      setScramble(mockScramble);
    } catch (error) {
      console.error('Failed to generate scramble:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard scramble={scramble} loading={loading} generateScramble={generateScramble} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'visualizer':
        return <CubeVisualizer scramble={scramble} />;
      case 'test':
        return (
          <TestInterface 
            onRunTest={async (config) => {
              console.log('Running test with config:', config);
              // TODO: Implement actual test execution
              await new Promise(resolve => setTimeout(resolve, 1000));
            }}
            isRunning={false}
            progress={0}
            results={[]}
          />
        );
      default:
        return <Dashboard scramble={scramble} loading={loading} generateScramble={generateScramble} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="main-content">
        <div className="app-header">
          <h1>🧊 Rubik's Cube LLM Benchmark</h1>
          <p>Testing AI models on 2x2 cube solving</p>
        </div>
        {renderView()}
      </main>
    </div>
  );
}

export default App;
