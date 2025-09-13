import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const scrambleRouter = require('./api/scramble-simple.js');
import { solveRouter } from './api/solve';
import { verifyRouter } from './api/verify';
import { scoreRouter } from './api/score';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/scramble', scrambleRouter);
app.use('/api/solve', solveRouter);
app.use('/api/verify', verifyRouter);
app.use('/api/score', scoreRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Rubik's Cube Eval Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
