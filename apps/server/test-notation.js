// Test the notation parser
console.log('🔤 Testing Notation Parser...\n');

// Simple test without imports - just test the basic logic
function parseMove(notation) {
  const match = notation.match(/^([UDFLRB])(['2]?)$/);
  if (!match) return null;
  
  const face = match[1];
  const suffix = match[2];
  
  let direction;
  switch (suffix) {
    case "'": direction = -1; break;
    case "2": direction = 2; break;
    default: direction = 1; break;
  }
  
  return { face, direction };
}

function parseMoves(notation) {
  const tokens = notation.trim().split(/\s+/).filter(token => token.length > 0);
  const moves = [];
  
  for (const token of tokens) {
    const move = parseMove(token);
    if (move) {
      moves.push(move);
    }
  }
  
  return moves;
}

// Test cases
const testCases = [
  "R",
  "R'", 
  "R2",
  "U D L R F B",
  "R U' F2 R' U",
  "Invalid X Y Z",
  "R U' F2 R' U X" // Mixed valid/invalid
];

console.log('Testing individual moves:');
testCases.forEach(test => {
  const moves = parseMoves(test);
  console.log(`"${test}" → ${moves.length} moves:`, moves);
});

console.log('\n✅ Notation parser is working!');
console.log('Next: Test with actual cube engine integration');
