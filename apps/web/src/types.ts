export type ViewType = 'dashboard' | 'leaderboard' | 'visualizer' | 'test';

export type ModelType = 'cohere' | 'gemini' | 'both';
export type TestType = 'single' | 'batch';

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

export interface TestConfig {
  model: ModelType;
  testType: TestType;
  numTests: number;
  scramble?: string;
}

export interface DashboardProps {
  scramble: string;
  loading: boolean;
  generateScramble: () => void;
}

export interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

export interface CubeVisualizerProps {
  scramble?: string;
}

export interface TestInterfaceProps {
  onRunTest: (config: TestConfig) => Promise<void>;
  isRunning?: boolean;
  progress?: number;
  results?: TestResult[];
}

export interface LeaderboardProps {
  results?: TestResult[];
}
