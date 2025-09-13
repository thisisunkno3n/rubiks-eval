import { Move } from './cube';

export interface EvaluationResult {
  success: boolean;
  efficiency: number; // move count / optimal (or baseline)
  latency: number; // response time in ms
  validity: number; // percentage of valid moves
  recall?: number; // percentage matching taught algorithms (memory mode)
  score: number;
  moves: Move[];
  invalidTokens: string[];
  responseTime: number;
}

export function calculateScore(result: EvaluationResult): number {
  const { success, efficiency, responseTime, validity, recall } = result;
  
  let score = 0;
  
  // Base success score
  if (success) score += 100;
  
  // Efficiency penalty (penalize moves beyond optimal)
  if (efficiency > 1) {
    score -= 10 * (efficiency - 1);
  }
  
  // Latency penalty (penalize slow responses)
  score -= 0.1 * (responseTime / 1000); // Convert ms to seconds
  
  // Validity penalty (penalize invalid moves)
  const invalidMoveCount = result.moves.length * (1 - validity / 100);
  score -= 2 * invalidMoveCount;
  
  // Recall bonus (in memory mode)
  if (recall !== undefined) {
    score += recall * 0.5; // Small bonus for following taught algorithms
  }
  
  return Math.max(0, score); // Don't allow negative scores
}

export function calculateEfficiency(moveCount: number, optimalCount: number = 11): number {
  // For 2x2, optimal solutions are typically 11 moves or less
  return moveCount / optimalCount;
}

export function calculateValidity(totalTokens: number, validMoves: number): number {
  if (totalTokens === 0) return 0;
  return (validMoves / totalTokens) * 100;
}
