import { CohereClient } from 'cohere-ai';
import { validateMoves } from '../core/notation';
import { validateSolutionFromNotation } from '../core/cube';

export interface LLMResponse {
  content: string;
  latency: number;
  isValid: boolean;
  moveCount: number;
}

export class CohereProvider {
  private client: CohereClient;
  
  constructor(apiKey: string) {
    this.client = new CohereClient({
      token: apiKey,
    });
  }
  
  async solveCube(scramble: string): Promise<LLMResponse> {
    const startTime = Date.now();
    
    const systemPrompt = `You are an expert at solving 2×2 Rubik's Cubes. Here's how to solve it:

1. First Layer (White Face):
   - Solve the white face and first layer together
   - Match the side colors with the center pieces

2. OLL (Orient Last Layer):
   - Make the top face all yellow
   - Use R U R' U' algorithms to orient corners

3. PLL (Permute Last Layer):
   - Swap the top layer pieces to their correct positions
   - Use R U R' U' for corner swaps

Input: Scramble in Singmaster notation (U, D, L, R, F, B with optional ' or 2).
Output: A SINGLE LINE of moves in the same notation.

Rules:
- Moves only, space separated
- Max 20 moves (optimal for 2×2)
- No rotations (x, y, z), no slice/wide moves
- Each move should bring the cube closer to being solved`;

    const userPrompt = `SCRAMBLE: ${scramble}
Return only the solution moves.`;
    
    try {
      const response = await this.client.chat({
        model: 'command-r',
        message: userPrompt,
        preamble: systemPrompt,
        maxTokens: 100,
        temperature: 0.1,
        k: 1
      });
      
      const latency = Date.now() - startTime;
      const content = response.text.trim();
      
      // First validate the move format
      const validation = validateMoves(content);
      
      // Only check if the solution solves the cube if the format is valid
      let isSolutionValid = false;
      if (validation.valid) {
        try {
          isSolutionValid = validateSolutionFromNotation(scramble, content);
        } catch (error) {
          console.error('Solution validation error:', error);
          isSolutionValid = false;
        }
      }
      
      return {
        content,
        latency,
        isValid: validation.valid && isSolutionValid,
        moveCount: validation.moves.length
      };
    } catch (error) {
      console.error('Cohere API error:', error);
      throw new Error('Failed to get response from Cohere');
    }
  }
  
  async solveWithMemory(scramble: string, algorithms: string[]): Promise<LLMResponse> {
    const startTime = Date.now();
    
    const systemPrompt = `You are solving a 2×2 Rubik's Cube.
Input: scramble in Singmaster notation (U, D, L, R, F, B with optional ' or 2).
Output: a SINGLE LINE of moves in the same notation.
Rules:
- Moves only, space separated.
- Max 20 moves (optimal for 2×2).
- No rotations (x, y, z), no slice/wide moves.

Reference algorithms you may reuse:
${algorithms.map(alg => `- ${alg}`).join('\n')}
Prefer these exact sequences when possible.`;

    const userPrompt = `SCRAMBLE: ${scramble}
Return only the solution moves.`;
    
    try {
      const response = await this.client.chat({
        model: 'command-r',
        message: userPrompt,
        preamble: systemPrompt,
        maxTokens: 100,
        temperature: 0.1,
        k: 1
      });
      
      const latency = Date.now() - startTime;
      const content = response.text.trim();
      
      // First validate the move format
      const validation = validateMoves(content);
      
      // Only check if the solution solves the cube if the format is valid
      let isSolutionValid = false;
      if (validation.valid) {
        try {
          isSolutionValid = validateSolutionFromNotation(scramble, content);
        } catch (error) {
          console.error('Solution validation error:', error);
          isSolutionValid = false;
        }
      }
      
      return {
        content,
        latency,
        isValid: validation.valid && isSolutionValid,
        moveCount: validation.moves.length
      };
    } catch (error) {
      console.error('Cohere API error:', error);
      throw new Error('Failed to get response from Cohere');
    }
  }
}
