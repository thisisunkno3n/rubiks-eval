import { Move } from './cube';

// Parse Singmaster notation: U, D, L, R, F, B with optional ' or 2
export function parseMove(notation: string): Move | null {
  const match = notation.match(/^([UDFLRB])(['2]?)$/);
  if (!match) return null;
  
  const face = match[1] as Move['face'];
  const suffix = match[2];
  
  let direction: Move['direction'];
  switch (suffix) {
    case "'": direction = -1; break;
    case "2": direction = 2; break;
    default: direction = 1; break;
  }
  
  return { face, direction };
}

export function parseMoves(notation: string): Move[] {
  const tokens = notation.trim().split(/\s+/).filter(token => token.length > 0);
  const moves: Move[] = [];
  
  for (const token of tokens) {
    const move = parseMove(token);
    if (move) {
      moves.push(move);
    }
  }
  
  return moves;
}

export function moveToString(move: Move): string {
  let notation = move.face;
  switch (move.direction) {
    case -1: notation += "'"; break;
    case 2: notation += "2"; break;
  }
  return notation;
}

export function movesToString(moves: Move[]): string {
  return moves.map(moveToString).join(' ');
}

export function validateMoves(notation: string): { valid: boolean; moves: Move[]; invalidTokens: string[] } {
  const tokens = notation.trim().split(/\s+/).filter(token => token.length > 0);
  const moves: Move[] = [];
  const invalidTokens: string[] = [];
  
  for (const token of tokens) {
    const move = parseMove(token);
    if (move) {
      moves.push(move);
    } else {
      invalidTokens.push(token);
    }
  }
  
  return {
    valid: invalidTokens.length === 0,
    moves,
    invalidTokens
  };
}
