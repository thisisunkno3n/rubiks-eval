import { Router } from 'express';
import { createCube, scrambleCube, applyMove, isSolved } from '../core/cube';
import { parseMoves, validateMoves } from '../core/notation';

export const verifyRouter = Router();

verifyRouter.post('/', (req, res) => {
  try {
    const { scramble, solution } = req.body;
    
    if (!scramble || !solution) {
      return res.status(400).json({ error: 'Scramble and solution are required' });
    }
    
    // Parse scramble and solution
    const scrambleMoves = parseMoves(scramble);
    const solutionMoves = parseMoves(solution);
    
    if (scrambleMoves.length === 0) {
      return res.status(400).json({ error: 'Invalid scramble notation' });
    }
    
    // Validate solution moves
    const validation = validateMoves(solution);
    
    // Create cube and apply scramble
    let cube = createCube();
    cube = scrambleCube(cube, scrambleMoves);
    
    // Apply solution moves
    for (const move of solutionMoves) {
      cube = applyMove(cube, move);
    }
    
    const solved = isSolved(cube);
    
    res.json({
      solved,
      solutionMoves,
      invalidTokens: validation.invalidTokens,
      moveCount: solutionMoves.length,
      validMoves: validation.moves.length,
      totalTokens: validation.moves.length + validation.invalidTokens.length
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Failed to verify solution' });
  }
});
