export interface TestResult {
  id: string;
  model: string;
  timestamp: string;
  scramble: string;
  solution: string;
  isSolved: boolean;
  solveTime: number;
  moveCount: number;
}
