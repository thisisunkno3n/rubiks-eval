import { useState, useCallback } from 'react';
import { ViewType, TestConfig, TestResult } from './types';
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
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateScramble = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scramble?length=10');
      const data = await response.json();
      
      if (data.error) {
        console.error('Backend error:', data.error);
        const mockScramble = "R U' F2 R' U F' R U R' U' F2 U R";
        setScramble(mockScramble);
        return mockScramble;
      } else {
        setScramble(data.scramble);
        return data.scramble;
      }
    } catch (error) {
      console.error('Failed to generate scramble:', error);
      const mockScramble = "R U' F2 R' U F' R U R' U' F2 U R";
      setScramble(mockScramble);
      return mockScramble;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRunTest = async (config: TestConfig) => {
    setIsRunning(true);
    setResults([]);
    setProgress(0);

    const runSingleTest = async (model: 'cohere' | 'gemini', currentScramble: string) => {
      try {
        // 1. Solve the cube
        const solveRes = await fetch(`/api/solve/${model}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scramble: currentScramble }),
        });
        const solveData = await solveRes.json();
        if (solveData.error) throw new Error(solveData.error);

        // 2. Verify the solution
        const verifyRes = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scramble: currentScramble, solution: solveData.content }),
        });
        const verifyData = await verifyRes.json();
                if (verifyData.error) throw new Error(verifyData.error);

        const finalResult: TestResult = {
          id: `${model}-${Date.now()}`,
          model: model,
          timestamp: new Date().toISOString(),
          scramble: currentScramble,
          solution: solveData.content,
          isSolved: verifyData.solved,
          solveTime: solveData.latency,
          moveCount: verifyData.moveCount,
        };

        // 3. Save the result
        await fetch('/api/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalResult),
        });

        return finalResult;

              } catch (error) {
        console.error(`Error testing ${model}:`, error);
        return {
          id: `${model}-${Date.now()}`,
          model: model,
          timestamp: new Date().toISOString(),
          scramble: currentScramble,
          solution: 'Error',
          isSolved: false,
          solveTime: 0,
          moveCount: 0,
        };
      }
    };

    if (config.testType === 'single') {
      const currentScramble = config.scramble || await generateScramble();
      if (!currentScramble) {
        setIsRunning(false);
        return;
      }

      let testResults: TestResult[] = [];
      if (config.model === 'cohere' || config.model === 'both') {
        const result = await runSingleTest('cohere', currentScramble);
        testResults.push(result);
        setResults([...testResults]);
        setProgress(config.model === 'both' ? 50 : 100);
      }
      if (config.model === 'gemini' || config.model === 'both') {
        const result = await runSingleTest('gemini', currentScramble);
        testResults.push(result);
        setResults([...testResults]);
        setProgress(100);
      }
    } else { // Batch test
      let allTestResults: TestResult[] = [];
      const modelsToTest: ('cohere' | 'gemini')[] = config.model === 'both' ? ['cohere', 'gemini'] : [config.model];

      for (let i = 0; i < config.numTests; i++) {
        const currentScramble = await generateScramble();
        if (!currentScramble) continue;

        for (const model of modelsToTest) {
          const result = await runSingleTest(model, currentScramble);
          allTestResults.push(result);
          setResults([...allTestResults]);

          const totalTests = config.numTests * modelsToTest.length;
          const completedTests = (i * modelsToTest.length) + modelsToTest.indexOf(model) + 1;
          setProgress(Math.round((completedTests / totalTests) * 100));
        }
      }
    }

    setIsRunning(false);
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
            onRunTest={handleRunTest}
            isRunning={isRunning}
            progress={progress}
            results={results}
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
