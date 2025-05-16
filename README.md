# Live Tracking Application

A full-stack application for live tracking functionality.

## Project Structure

```
.
├── packages/
│   ├── frontend/    # Frontend application (Vite + React)
│   ├── backend/     # Backend application (Node.js)
│   └── shared/      # Shared code and utilities
└── package.json     # Root package.json
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install dependencies for each package:
   ```bash
   cd packages/frontend && npm install
   cd ../backend && npm install
   cd ../shared && npm install
   ```

## Development

### Frontend

```bash
npm run dev:frontend
```

### Backend

```bash
npm run dev:backend
```

## Environment Variables

Create `.env` files in both frontend and backend directories:

- `frontend/.env`
- `backend/.env`

## License

MIT
