import { CohereClient } from 'cohere-ai';
import { validateMoves } from '../core/notation';

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
    
    const systemPrompt = `You are solving a 2×2 Rubik's Cube.
Input: scramble in Singmaster notation (U, D, L, R, F, B with optional ' or 2).
Output: a SINGLE LINE of moves in the same notation.
Rules:
- Moves only, space separated.
- Max 40 moves.
- No rotations (x, y, z), no slice/wide moves.`;

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
      const validation = validateMoves(content);
      
      return { content, latency, isValid: validation.valid, moveCount: validation.moves.length };
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
- Max 40 moves.
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
      const validation = validateMoves(content);
      
      return { content, latency, isValid: validation.valid, moveCount: validation.moves.length };
    } catch (error) {
      console.error('Cohere API error:', error);
      throw new Error('Failed to get response from Cohere');
    }
  }
}
