import { Router } from 'express';
import { CohereProvider } from '../providers/cohere';
import { GeminiProvider } from '../providers/gemini';

export const solveRouter = Router();

const cohereProvider = new CohereProvider(process.env.COHERE_API_KEY || '');
const geminiProvider = new GeminiProvider(process.env.GEMINI_API_KEY || '');

solveRouter.post('/cohere', async (req, res) => {
  try {
    const { scramble, algorithms } = req.body;
    
    if (!scramble) {
      return res.status(400).json({ error: 'Scramble is required' });
    }
    
    const response = algorithms 
      ? await cohereProvider.solveWithMemory(scramble, algorithms)
      : await cohereProvider.solveCube(scramble);
    
    res.json(response);
  } catch (error) {
    console.error('Solve error:', error);
    res.status(500).json({ error: 'Failed to solve cube with Cohere' });
  }
});

solveRouter.post('/gemini', async (req, res) => {
  try {
    const { scramble, algorithms } = req.body;
    
    if (!scramble) {
      return res.status(400).json({ error: 'Scramble is required' });
    }
    
    const response = algorithms 
      ? await geminiProvider.solveWithMemory(scramble, algorithms)
      : await geminiProvider.solveCube(scramble);
    
    res.json(response);
  } catch (error) {
    console.error('Solve error:', error);
    res.status(500).json({ error: 'Failed to solve cube with Gemini' });
  }
});
