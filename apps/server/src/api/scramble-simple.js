// Simple JavaScript version of scramble endpoint
const express = require('express');
const router = express.Router();

// Simple scramble generation (copied from test-scramble.js)
function getRandomScramble(length = 10) {
  const faces = ['U', 'D', 'L', 'R', 'F', 'B'];
  const directions = [1, -1, 2];
  const scramble = [];
  
  for (let i = 0; i < length; i++) {
    const face = faces[Math.floor(Math.random() * faces.length)];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    scramble.push({ face, direction });
  }
  
  return scramble;
}

function movesToString(moves) {
  return moves.map(move => {
    let notation = move.face;
    switch (move.direction) {
      case -1: notation += "'"; break;
      case 2: notation += "2"; break;
    }
    return notation;
  }).join(' ');
}

router.get('/', (req, res) => {
  try {
    const length = parseInt(req.query.length) || 10;
    const scramble = getRandomScramble(length);
    const notation = movesToString(scramble);
    
    res.json({
      scramble: notation,
      moves: scramble,
      length: scramble.length
    });
  } catch (error) {
    console.error('Scramble error:', error);
    res.status(500).json({ error: 'Failed to generate scramble' });
  }
});

module.exports = router;
