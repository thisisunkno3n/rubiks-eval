// Simple 2x2 Rubik's Cube representation
export interface CubeState {
  corners: number[]; // 8 corners, each with position and orientation
}

export interface Move {
  face: 'U' | 'D' | 'L' | 'R' | 'F' | 'B';
  direction: 1 | -1 | 2; // 1 = clockwise, -1 = counter-clockwise, 2 = 180°
}

// Corner positions: UFL, UFR, UBL, UBR, DFL, DFR, DBL, DBR
// Each corner has position (0-7) and orientation (0-2)
export const SOLVED_STATE: CubeState = {
  corners: [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0]
};

// Corner permutation tables for each face
const CORNER_MOVES = {
  U: { positions: [0, 1, 2, 3], cycle: [1, 2, 3, 0] },
  D: { positions: [4, 5, 6, 7], cycle: [5, 6, 7, 4] },
  L: { positions: [0, 3, 4, 7], cycle: [3, 7, 4, 0] },
  R: { positions: [1, 2, 5, 6], cycle: [2, 6, 5, 1] },
  F: { positions: [0, 1, 4, 5], cycle: [1, 5, 4, 0] },
  B: { positions: [2, 3, 6, 7], cycle: [3, 7, 6, 2] }
};

export function createCube(): CubeState {
  return JSON.parse(JSON.stringify(SOLVED_STATE));
}

export function applyMove(cube: CubeState, move: Move): CubeState {
  const newCube = JSON.parse(JSON.stringify(cube));
  const { face, direction } = move;
  const moveData = CORNER_MOVES[face];
  
  // Apply the move based on direction
  const cycles = Math.abs(direction) === 2 ? 2 : 1;
  const reverse = direction < 0;
  
  for (let cycle = 0; cycle < cycles; cycle++) {
    const positions = moveData.positions;
    const permutation = reverse ? moveData.cycle.slice().reverse() : moveData.cycle;
    
    // Store original values
    const originalPositions = positions.map(pos => newCube.corners[pos * 2]);
    const originalOrientations = positions.map(pos => newCube.corners[pos * 2 + 1]);
    
    // Apply permutation
    for (let i = 0; i < positions.length; i++) {
      const newPos = positions[permutation[i]];
      newCube.corners[newPos * 2] = originalPositions[i];
      newCube.corners[newPos * 2 + 1] = originalOrientations[i];
    }
    
    // Update orientations for F and B faces
    if (face === 'F' || face === 'B') {
      for (const pos of positions) {
        newCube.corners[pos * 2 + 1] = (newCube.corners[pos * 2 + 1] + 1) % 3;
      }
    }
  }
  
  return newCube;
}

export function isSolved(cube: CubeState): boolean {
  for (let i = 0; i < 8; i++) {
    if (cube.corners[i * 2] !== i || cube.corners[i * 2 + 1] !== 0) {
      return false;
    }
  }
  return true;
}

export function scrambleCube(cube: CubeState, moves: Move[]): CubeState {
  let scrambled = cube;
  for (const move of moves) {
    scrambled = applyMove(scrambled, move);
  }
  return scrambled;
}

export function getRandomScramble(length: number = 10): Move[] {
  const faces: Array<Move['face']> = ['U', 'D', 'L', 'R', 'F', 'B'];
  const directions: Array<Move['direction']> = [1, -1, 2];
  const scramble: Move[] = [];
  
  for (let i = 0; i < length; i++) {
    const face = faces[Math.floor(Math.random() * faces.length)];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    scramble.push({ face, direction });
  }
  
  return scramble;
}
