# �� Rubik's Cube LLM Benchmark - Frontend Developer Guide

## 🎯 Project Overview

We're building a **benchmark system to evaluate Large Language Models (LLMs)** on solving 2×2 Rubik's Cube scrambles. This is for **Hack the North hackathon** - we have ~8 hours to build something impressive!

### Core Concept
1. **Generate** random 2×2 cube scrambles
2. **Send** scramble to LLMs (Cohere, Gemini)
3. **Parse** their solution attempts
4. **Verify** if the cube is actually solved
5. **Score** based on success, efficiency, speed
6. **Visualize** results in a leaderboard + 3D cube replay

## �� Your Role: Frontend Developer

You're responsible for the **user interface and visualization** - making this look professional and impressive for the judges!

### Your Tasks (Priority Order):

#### 1. **React Frontend Setup** ✅ (Partially Done)
- [x] Basic React app with Vite
- [x] Simple scramble generator UI
- [ ] **TODO:** Test the current setup and fix any issues

#### 2. **Leaderboard Component** 🔥 (High Priority)
```typescript
// Create: apps/web/src/components/Leaderboard.tsx
interface TestResult {
  model: string;        // "Cohere" or "Gemini"
  scramble: string;     // "R U' F2 R' U"
  solution: string;     // "U R U' R' F' U F"
  success: boolean;     // Did it solve the cube?
  score: number;        // Overall score (0-100)
  efficiency: number;   // Move count / optimal
  latency: number;      // Response time in ms
  validity: number;     // % of valid moves
  timestamp: string;
}
```

**Features needed:**
- Table showing all test results
- Sort by score, success rate, speed
- Color coding (green for success, red for failure)
- Real-time updates as tests run

#### 3. **Cube Visualization** 🎨 (Medium Priority)
- [ ] **TODO:** Research and integrate 3D cube library
- [ ] Show scramble animation
- [ ] Show solution replay
- [ ] Interactive cube viewer

**Libraries to research:**
- `@cubing/twisty` (might not exist, find alternatives)
- `three.js` with custom cube
- `react-three-fiber`
- Any other 3D cube libraries

#### 4. **Testing Interface** 🧪 (Medium Priority)
- [ ] Manual test runner (single scramble)
- [ ] Batch test runner (multiple scrambles)
- [ ] Progress indicators
- [ ] Error handling and display

#### 5. **Memory Stress Testing** 🧠 (Low Priority)
- [ ] UI for teaching algorithms to models
- [ ] Display of taught algorithms
- [ ] Recall percentage calculation

## ��️ Current Project Structure

```
rubiks-eval/
├── apps/
│   ├── server/          # Backend (Felix's work)
│   │   ├── src/core/    # Cube logic, notation parsing
│   │   ├── src/providers/ # LLM API integrations
│   │   └── src/api/     # Express endpoints
│   └── web/             # Frontend (YOUR WORK)
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── App.tsx     # Main app
│       │   └── main.tsx    # Entry point
│       └── package.json
├── bench/               # CLI testing (Felix)
└── README.md
```

## 🚀 Getting Started

### 1. **Clone and Setup**
```bash
git clone [your-repo-url]
cd rubiks-eval
npm install
cd apps/web && npm install
```

### 2. **Test Current Setup**
```bash
cd apps/web
npm run dev
```
Visit `http://localhost:3000` - you should see a basic UI with a "Generate Scramble" button.

### 3. **Backend API Endpoints** (Felix will implement)
```typescript
// These endpoints will be available:
GET  /api/scramble              // Generate random scramble
POST /api/solve/cohere         // Solve with Cohere
POST /api/solve/gemini         // Solve with Gemini  
POST /api/verify               // Verify solution
POST /api/score                // Calculate score
```

## 🎨 Design Guidelines

### Visual Style
- **Modern, clean interface** - think GitHub or Vercel
- **Color scheme:** Blue/purple gradients (already started)
- **Typography:** Clean, readable fonts
- **Responsive:** Works on mobile and desktop

### Key UI Elements
1. **Header:** " Rubik's Cube LLM Benchmark"
2. **Scramble Section:** Current scramble display
3. **Test Controls:** Start/stop testing buttons
4. **Leaderboard:** Results table with sorting
5. **Cube Viewer:** 3D visualization (stretch goal)

## 📊 Data Flow

```
Generate Scramble → Send to LLM → Parse Response → Verify Solution → Calculate Score → Update Leaderboard → Show Cube Animation
```

## 🧪 Testing Strategy

### Manual Testing
- Single scramble testing
- Real-time result display
- Error handling for API failures

### Batch Testing
- Run multiple tests automatically
- Progress bars and status updates
- Export results to JSON

##  Success Metrics for Judges

### What Makes This Impressive:
1. **Professional UI** - looks like a real product
2. **Real-time visualization** - see the cube solving
3. **Comprehensive metrics** - not just success/failure
4. **Multiple LLM comparison** - Cohere vs Gemini
5. **Memory testing** - advanced AI evaluation

### Demo Flow:
1. Show the problem (2x2 cube solving)
2. Generate a scramble
3. Send to both LLMs
4. Show real-time results
5. Display leaderboard with metrics
6. Show cube animation of the solution

## 🚨 Common Issues & Solutions

### API Integration
- Backend might not be ready - create mock data first
- CORS issues - check proxy setup in vite.config.ts
- Rate limiting - add delays between requests

### 3D Visualization
- Library might not exist - fallback to 2D representation
- Performance issues - optimize animations
- Mobile compatibility - test on phones

##  Learning Resources

### React/TypeScript
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### 3D Graphics
- [Three.js Fundamentals](https://threejs.org/manual/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

### Cube Notation
- [Singmaster Notation](https://ruwix.com/the-rubiks-cube/notation/)
- [2x2 Cube Basics](https://ruwix.com/2x2x2-rubiks-cube/)

##  Timeline (8 Hours Total)

### Hour 1-2: Setup & Basic UI
- [ ] Test current setup
- [ ] Fix any issues
- [ ] Create leaderboard component

### Hour 3-4: API Integration
- [ ] Connect to backend endpoints
- [ ] Handle loading states
- [ ] Error handling

### Hour 5-6: Visualization
- [ ] Research 3D cube libraries
- [ ] Implement basic cube viewer
- [ ] Add animations

### Hour 7-8: Polish & Demo
- [ ] Final UI polish
- [ ] Demo preparation
- [ ] Bug fixes

## 🆘 When You Need Help

### Contact Felix for:
- Backend API issues
- Cube logic questions
- Data structure questions

### Research on your own:
- 3D cube visualization libraries
- React best practices
- UI/UX design patterns

##  Final Goal

Create a **professional-looking benchmark tool** that:
- ✅ Looks impressive to judges
- ✅ Demonstrates real AI evaluation
- ✅ Shows technical competence
- ✅ Has a working demo

**Remember:** We're not building a perfect product - we're building something that demonstrates our skills and the concept in 8 hours!

Good luck! 🚀

##  **Summary for Your Teammate:**

**Your teammate should:**
1. **Create this file** as `TEAMMATE_GUIDE.md` in the root directory
2. **Start with testing** the current React setup
3. **Focus on the leaderboard** component first (highest impact)
4. **Research 3D cube libraries** for visualization
5. **Create mock data** if backend isn't ready yet

**Key priorities:**
- 🔥 **Leaderboard component** (makes it look professional)
- 🎨 **3D cube visualization** (impressive for judges)
- 🧪 **Testing interface** (shows the benchmark working)

The guide gives them everything they need to understand the project scope, their role, and how to get started. They can feed this into Cursor and get AI assistance for the frontend work while you focus on the backend!
