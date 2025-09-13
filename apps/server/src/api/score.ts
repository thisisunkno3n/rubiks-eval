import { Router } from 'express';
import { EvaluationResult, calculateScore, calculateEfficiency, calculateValidity } from '../core/metrics';

export const scoreRouter = Router();

scoreRouter.post('/', (req, res) => {
  try {
    const { 
      solved, 
      moveCount, 
      responseTime, 
      validMoves, 
      totalTokens,
      optimalCount = 11,
      recall
    } = req.body;
    
    const efficiency = calculateEfficiency(moveCount, optimalCount);
    const validity = calculateValidity(totalTokens, validMoves);
    
    const result: EvaluationResult = {
      success: solved,
      efficiency,
      latency: responseTime,
      validity,
      recall,
      score: 0, // Will be calculated
      moves: [], // Not needed for scoring
      invalidTokens: [],
      responseTime
    };
    
    result.score = calculateScore(result);
    
    res.json({
      score: result.score,
      efficiency,
      validity,
      success: solved,
      latency: responseTime,
      recall
    });
  } catch (error) {
    console.error('Scoring error:', error);
    res.status(500).json({ error: 'Failed to calculate score' });
  }
});
