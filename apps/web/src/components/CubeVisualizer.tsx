  import React, { useEffect } from 'react';
import { CubeVisualizerProps } from '../types';
import { TwistyPlayer } from 'cubing/twisty';

// Register the custom element
if (typeof window !== 'undefined' && !customElements.get('twisty-player')) {
  customElements.define('twisty-player', TwistyPlayer);
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'twisty-player': React.DetailedHTMLProps<React.HTMLAttributes<TwistyPlayer> & {
        puzzle?: string;
        alg?: string;
        background?: string;
        'control-panel'?: string;
      }, TwistyPlayer>;
    }
  }
}

const CubeVisualizer: React.FC<CubeVisualizerProps> = ({ scramble = "" }) => {
  const playerRef = React.useRef<TwistyPlayer>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.alg = scramble;
    }
  }, [scramble]);

  return (
    <div className="cube-visualizer card">
      <h2>3D Cube Visualizer</h2>
      
      <div className="visualization-container">
        <twisty-player
          ref={playerRef}
          puzzle="3x3x3"
          alg={scramble}
          background="none"
          control-panel="none"
          style={{ width: '100%', height: '400px' }}
        />
      </div>
      
      <div className="controls">
        <button 
          className="btn"
          disabled={!scramble}
          onClick={() => playerRef.current?.play()}
        >
          Play Scramble
        </button>
        <button 
          className="btn"
          onClick={() => {
            if (playerRef.current) {
              playerRef.current.alg = '';
              playerRef.current.alg = scramble;
            }
          }}
        >
          Reset View
        </button>
      </div>
      
      <div className="move-history">
        <h3>Scramble</h3>
        <div className="moves">
          {scramble ? (
            <p className="scramble-text">{scramble}</p>
          ) : (
            <p>No scramble available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CubeVisualizer;
