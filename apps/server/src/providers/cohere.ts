import { CohereClient } from 'cohere-ai';

export interface LLMResponse {
  content: string;
  latency: number;
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
      const response = await this.client.generate({
        model: 'command',
        prompt: `${systemPrompt}\n\n${userPrompt}`,
        max_tokens: 100,
        temperature: 0.1,
        stop_sequences: ['\n\n']
      });
      
      const latency = Date.now() - startTime;
      const content = response.generations[0]?.text?.trim() || '';
      
      return { content, latency };
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
      const response = await this.client.generate({
        model: 'command',
        prompt: `${systemPrompt}\n\n${userPrompt}`,
        max_tokens: 100,
        temperature: 0.1,
        stop_sequences: ['\n\n']
      });
      
      const latency = Date.now() - startTime;
      const content = response.generations[0]?.text?.trim() || '';
      
      return { content, latency };
    } catch (error) {
      console.error('Cohere API error:', error);
      throw new Error('Failed to get response from Cohere');
    }
  }
}
