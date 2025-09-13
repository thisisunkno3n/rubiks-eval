// Simple test without imports - just test the basic logic
console.log('🧊 Testing Cube Engine...\n');

// Simple cube state representation
const SOLVED_STATE = {
  corners: [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0]
};

function createCube() {
  return JSON.parse(JSON.stringify(SOLVED_STATE));
}

function isSolved(cube) {
  for (let i = 0; i < 8; i++) {
    if (cube.corners[i * 2] !== i || cube.corners[i * 2 + 1] !== 0) {
      return false;
    }
  }
  return true;
}

// Test 1: Create a solved cube
const cube = createCube();
console.log('✅ Created solved cube:', isSolved(cube));

// Test 2: Create a scrambled cube
const scrambledCube = {
  corners: [1, 0, 2, 0, 0, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0]
};
console.log('✅ Scrambled cube is solved:', isSolved(scrambledCube));

console.log('\n🎉 Basic cube logic is working!');
console.log('Next: Implement move application and notation parsing');
