import { Router } from 'express';
import { getRandomScramble, movesToString } from '../core/cube';

export const scrambleRouter = Router();

scrambleRouter.get('/', (req, res) => {
  try {
    const length = parseInt(req.query.length as string) || 10;
    const scramble = getRandomScramble(length);
    const notation = movesToString(scramble);
    
    res.json({
      scramble: notation,
      moves: scramble,
      length: scramble.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate scramble' });
  }
});

scrambleRouter.post('/custom', (req, res) => {
  try {
    const { moves } = req.body;
    if (!Array.isArray(moves)) {
      return res.status(400).json({ error: 'Moves must be an array' });
    }
    
    const notation = movesToString(moves);
    
    res.json({
      scramble: notation,
      moves: moves,
      length: moves.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process custom scramble' });
  }
});
