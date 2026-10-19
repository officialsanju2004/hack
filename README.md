# AlgoLens — Interactive Algorithm Visualizer

## Quick start
```bash
unzip algolens.zip && cd algolens
npm run install:all
cp backend/.env.example backend/.env
npm run dev          # → http://localhost:5173 (API :4000)
```

Tests: npm test. Build: npm run build.

Features

· 5 sorts, 2 searches, 3 graph algorithms on a shared step protocol
· Play/Pause/Next/Prev/Reset, speed slider, keyboard (Space / ← / → / R)
· Pseudocode highlight, plain-English explanations, live stats, complexity + why
· Beginner/Advanced mode, custom input, presets, graph editor
· Save/load scenarios, compare two algorithms, "Predict next step" quiz

Structure

· backend/ — Express + Mongoose + zod + pure algorithm fns returning step arrays
· frontend/ — Vite + React + Tailwind + Zustand + Framer Motion
  EOF

############################ BACKEND ############################
cat > backend/package.json <<'EOF'
{
"name": "algolens-backend",
"version": "1.0.0",
"type": "module",
"scripts": {
"dev": "node --watch src/server.js",
"start": "node src/server.js",
"seed": "node src/seed/seedAlgorithms.js",
"test": "node --test tests"
},
"dependencies": {
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.21.0",
"mongoose": "^8.7.0",
"zod": "^3.23.8"
}
}
