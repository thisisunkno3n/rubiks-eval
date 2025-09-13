import React, { useState } from 'react';
import { ModelType, TestConfig, TestResult, TestType } from '../types';

interface TestInterfaceProps {
  onRunTest: (config: TestConfig) => Promise<void>;
  isRunning?: boolean;
  progress?: number;
  results?: TestResult[];
}

const TestInterface: React.FC<TestInterfaceProps> = ({
  onRunTest,
  isRunning = false,
  progress = 0,
  results = []
}) => {
  const [model, setModel] = useState<ModelType>('both');
  const [testType, setTestType] = useState<TestType>('single');
  const [numTests, setNumTests] = useState(5);
  const [scramble] = useState('');

  const handleRunTest = async () => {
    const config: TestConfig = {
      model,
      testType,
      numTests,
      ...(testType === 'single' && { scramble })
    };
    
    try {
      await onRunTest(config);
    } catch (error) {
      console.error('Error running test:', error);
    }
  };

  return (
    <div className="test-interface">
      <h2>Run Tests</h2>
      
      <div className="test-controls">
        <div className="form-group">
          <label>Model</label>
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value as ModelType)}
            disabled={isRunning}
          >
            <option value="both">Both Models</option>
            <option value="cohere">Cohere</option>
            <option value="gemini">Gemini</option>
          </select>
        </div>

        <div className="form-group">
          <label>Test Type</label>
          <select 
            value={testType} 
            onChange={(e) => setTestType(e.target.value as TestType)}
            disabled={isRunning}
          >
            <option value="single">Single Test</option>
            <option value="batch">Batch Test</option>
          </select>
        </div>

        {testType === 'batch' && (
          <div className="form-group">
            <label>Number of Tests</label>
            <input 
              type="number" 
              min="1" 
              max="100" 
              value={numTests}
              onChange={(e) => setNumTests(parseInt(e.target.value) || 1)}
              disabled={isRunning}
            />
          </div>
        )}

        <button 
          onClick={handleRunTest}
          disabled={isRunning}
          className="btn btn-primary"
        >
          {isRunning ? 'Running...' : 'Run Test'}
        </button>
      </div>

      {isRunning && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">{progress}% Complete</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="test-results">
          <h3>Test Results</h3>
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Status</th>
                <th>Moves</th>
                <th>Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className={result.isSolved ? 'success' : 'error'}>
                  <td>{result.model}</td>
                  <td>{result.isSolved ? '✅ Success' : '❌ Failed'}</td>
                  <td>{result.moveCount}</td>
                  <td>{(result.solveTime / 1000).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TestInterface;
