import { Router } from 'express';
import { readResults, saveResult } from '../db';
import { TestResult } from '../types';

export const resultsRouter = Router();

resultsRouter.get('/', async (req, res) => {
  try {
    const results = await readResults();
    res.json(results);
  } catch (error) {
    console.error('Error reading results:', error);
    res.status(500).json({ error: 'Failed to retrieve results' });
  }
});

resultsRouter.post('/', async (req, res) => {
  try {
    const result = req.body as TestResult;
    await saveResult(result);
    res.status(201).json({ message: 'Result saved' });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'Failed to save result' });
  }
});
