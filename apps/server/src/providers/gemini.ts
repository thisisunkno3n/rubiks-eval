import { GoogleGenerativeAI } from '@google/generative-ai';

export interface LLMResponse {
  content: string;
  latency: number;
}

export class GeminiProvider {
  private genAI: GoogleGenerativeAI;
  private model: any;
  
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
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
      const result = await this.model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
      const response = await result.response;
      const content = response.text().trim();
      const latency = Date.now() - startTime;
      
      return { content, latency };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to get response from Gemini');
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
      const result = await this.model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
      const response = await result.response;
      const content = response.text().trim();
      const latency = Date.now() - startTime;
      
      return { content, latency };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to get response from Gemini');
    }
  }
}
