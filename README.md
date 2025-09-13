# 🧊 Rubik's Cube LLM Benchmark

A benchmark system to evaluate Large Language Models on solving 2×2 Rubik's Cube scrambles.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   cd apps/server && npm install
   cd ../web && npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your API keys (Cohere & Gemini)
   ```

3. **Test the cube engine:**
   ```bash
   cd apps/server
   node test-cube.js
   ```

4. **Run the development servers:**
   ```bash
   npm run dev
   ```

## 🎯 Current Progress

- ✅ Project setup
- 🔄 Cube engine (in progress)
- ⏳ Notation parser
- ⏳ Basic server
- ⏳ Frontend setup

## 👥 Work Split

**Felix (Backend):**
- Cube engine ✅
- Notation parser
- API integrations
- Verification system

**Teammate (Frontend):**
- React components
- Cube visualization
- Leaderboard UI
- Testing & documentation

## 🧪 Testing the Cube Engine

Run this to verify everything works:
```bash
cd apps/server
node test-cube.js
```

You should see:
```
🧊 Testing Cube Engine...

✅ Created solved cube: true
✅ Applied R move, cube is solved: false
✅ Applied R' move, cube is solved: true
✅ Generated scramble: [array of moves]

🎉 Cube engine is working!
```

## 📁 Project Structure

```
rubiks-eval/
├── apps/
│   ├── server/          # Backend (Felix)
│   │   ├── src/core/    # Cube logic
│   │   └── test-cube.js # Test file
│   └── web/             # Frontend (Teammate)
│       └── src/         # React components
├── package.json         # Workspace root
└── README.md
```

## 🎯 Next Steps

1. **Felix:** Complete the notation parser
2. **Teammate:** Test the frontend setup
3. **Both:** Set up API keys and test integration

Let's build this step by step! 🚀
