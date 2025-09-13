import React, { useState } from 'react'
import './App.css'

function App() {
  const [scramble, setScramble] = useState('')
  const [loading, setLoading] = useState(false)

  const generateScramble = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/scramble')
      const data = await response.json()
      setScramble(data.scramble)
    } catch (error) {
      console.error('Failed to generate scramble:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧊 Rubik's Cube LLM Benchmark</h1>
        <p>Testing AI models on 2x2 cube solving</p>
        
        <div className="scramble-section">
          <button onClick={generateScramble} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Scramble'}
          </button>
          {scramble && (
            <div className="scramble-display">
              <h3>Scramble:</h3>
              <code>{scramble}</code>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default App
