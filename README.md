# AlgoLens: Interactive Algorithm Visualizer

AlgoLens teaches algorithms by running them step by step. Every step comes with a plain-English explanation, highlighted pseudocode, live stats and complexity analysis.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Features
- 10 algorithms: 5 sorting, 2 searching, 3 graph
- Play / Pause / Next / Prev / Reset and a speed slider
- Keyboard shortcuts: `Space`, `←`, `→`, `R`
- Pseudocode highlighting and plain-English explanations
- Live stats, complexity and the reasoning behind it
- Beginner / Advanced mode
- Custom input, presets and a graph editor
- Save / load scenarios
- Compare two algorithms side by side
- "Predict next step" quiz

## Tech Stack
| Layer    | Technologies                                      |
| -------- | ------------------------------------------------- |
| Frontend | Vite, React, Tailwind CSS, Zustand, Framer Motion |
| Backend  | Node.js, Express, MongoDB (Mongoose), zod         |

## How It Works
Each algorithm is a pure function that returns an array of **steps**. The frontend replays those steps. To add a new algorithm, write one function that follows the shared step format.

Example step (illustrative):
```json
{
  "type": "compare",
  "indices": [2, 3],
  "array": [5, 2, 9, 1],
  "line": 4,
  "explanation": "Compare 9 and 1. 9 is larger, so they will be swapped."
}
```

## Setup

### Prerequisites
- Node.js 18+
- MongoDB (local install or a free MongoDB Atlas cluster)

### Install
```bash
git clone https://github.com/officialsanju2004/hack.git
cd hack
npm run install:all
cp backend/.env.example backend/.env
```

### Run
```bash
npm run dev
```
- Frontend: http://localhost:5173
- API: http://localhost:4000

### Other commands
```bash
npm test         # run all tests
npm run build    # production build
cd backend && npm run seed   # seed algorithm data
```

## Environment Variables
Create `backend/.env`:
```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/algolens
CLIENT_URL=http://localhost:5173
```
(Check `backend/.env.example` for the exact variable names.)

## API Reference
Base URL: `http://localhost:4000/api`

> Verify these against `backend/src/routes` and update if needed.

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/health`                 | Server health check                |
| GET    | `/algorithms`             | List all algorithms                |
| GET    | `/algorithms/:id`         | Details, pseudocode, complexity    |
| POST   | `/algorithms/:id/run`     | Run an algorithm, returns steps    |
| GET    | `/scenarios`              | List saved scenarios               |
| POST   | `/scenarios`              | Save a scenario                    |
| GET    | `/scenarios/:id`          | Load one scenario                  |
| DELETE | `/scenarios/:id`          | Delete a scenario                  |

### Example: run an algorithm
Request:
```bash
curl -X POST http://localhost:4000/api/algorithms/bubble-sort/run \
  -H "Content-Type: application/json" \
  -d '{"input": [5, 2, 9, 1]}'
```
Response (shape):
```json
{
  "steps": [ { "type": "compare", "indices": [0, 1] } ],
  "stats": { "comparisons": 6, "swaps": 4 }
}
```

### Validation errors
Inputs are validated with zod. Bad input returns `400`:
```json
{ "error": "Validation failed", "details": [ { "path": ["input"], "message": "Required" } ] }
```

## Testing

### 1. Automated tests (backend)
Algorithm functions are pure, so they are easy to unit test.
```bash
cd backend
npm test
```
This uses Node's built-in test runner (`node --test tests`). What to cover:
- Sorting: result is sorted, and empty, single-item, duplicate and already-sorted arrays work
- Searching: item found, not found, first/last element
- Graphs: disconnected graph, single node, correct visit order
- Steps: last step matches the final result

### 2. Test the API with curl
Start the backend first (`npm run dev`), then:
```bash
# Health
curl http://localhost:4000/api/health

# List algorithms
curl http://localhost:4000/api/algorithms

# Run an algorithm
curl -X POST http://localhost:4000/api/algorithms/bubble-sort/run \
  -H "Content-Type: application/json" \
  -d '{"input": [5, 2, 9, 1]}'

# Invalid input (expect 400)
curl -X POST http://localhost:4000/api/algorithms/bubble-sort/run \
  -H "Content-Type: application/json" \
  -d '{"input": "abc"}'

# Save a scenario
curl -X POST http://localhost:4000/api/scenarios \
  -H "Content-Type: application/json" \
  -d '{"name": "My test", "algorithm": "bubble-sort", "input": [3,1,2]}'
```

### 3. Test with Postman / Thunder Client
1. Create a new request, set the method and URL (for example `POST http://localhost:4000/api/algorithms/bubble-sort/run`).
2. Under Body choose raw → JSON and paste the input.
3. Send and check the status code (`200`/`201` for success, `400` for bad input, `404` for unknown id).

### 4. Manual UI checklist
- [ ] Pick each algorithm, press Play, and check it finishes sorted or found
- [ ] Next / Prev / Reset behave correctly
- [ ] Keyboard shortcuts: Space, ←, →, R
- [ ] Speed slider changes the animation speed
- [ ] Custom input works, and invalid input shows an error
- [ ] Graph editor: add and remove nodes and edges, then run BFS / DFS
- [ ] Save a scenario, refresh the page, load it back
- [ ] Compare mode runs two algorithms together
- [ ] Quiz gives correct and wrong feedback
- [ ] Beginner / Advanced toggle changes the explanations

## Troubleshooting
| Problem                          | Fix                                                        |
| -------------------------------- | ---------------------------------------------------------- |
| `MongoNetworkError`              | Start MongoDB or check `MONGODB_URI`                       |
| CORS error in browser            | Set `CLIENT_URL` in `backend/.env` to the frontend URL     |
| Port already in use              | Change `PORT` or stop the other process                    |
| Empty algorithm list             | Run `npm run seed` inside `backend/`                       |

## Contributing
1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit, push and open a pull request

## License
MIT (add a LICENSE file)