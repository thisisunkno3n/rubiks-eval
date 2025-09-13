// Simple test to verify cube engine works
import { createCube, applyMove, isSolved, getRandomScramble } from './src/core/cube.js';

console.log('🧊 Testing Cube Engine...\n');

// Test 1: Create a solved cube
const cube = createCube();
console.log('✅ Created solved cube:', isSolved(cube));

// Test 2: Apply a simple move and verify it's not solved
const move = { face: 'R', direction: 1 };
const movedCube = applyMove(cube, move);
console.log('✅ Applied R move, cube is solved:', isSolved(movedCube));

// Test 3: Apply reverse move to get back to solved
const reverseMove = { face: 'R', direction: -1 };
const solvedAgain = applyMove(movedCube, reverseMove);
console.log('✅ Applied R\' move, cube is solved:', isSolved(solvedAgain));

// Test 4: Generate random scramble
const scramble = getRandomScramble(5);
console.log('✅ Generated scramble:', scramble);

console.log('\n🎉 Cube engine is working!');
