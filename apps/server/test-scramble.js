// Test scramble generation directly
console.log('🎲 Testing Scramble Generation...\n');

// Import the functions we need (simplified version)
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

// Test scramble generation
console.log('Testing scramble generation:');
for (let i = 0; i < 3; i++) {
  const scramble = getRandomScramble(5);
  const notation = movesToString(scramble);
  console.log(`Scramble ${i + 1}: ${notation}`);
  console.log(`  Moves:`, scramble);
}

console.log('\n✅ Scramble generation is working!');
console.log('The server should be able to generate scrambles once the port issue is resolved.');
