import fs from 'fs/promises';
import path from 'path';
import { TestResult } from './types.js';

const DB_PATH = path.join(__dirname, '..', '..', 'db.json');

export const readResults = async (): Promise<TestResult[]> => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data) as TestResult[];
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
};

export const saveResult = async (result: TestResult): Promise<void> => {
  const results = await readResults();
  results.push(result);
  await fs.writeFile(DB_PATH, JSON.stringify(results, null, 2));
};
