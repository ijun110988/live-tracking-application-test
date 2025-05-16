#!/bin/bash

# Start backend
(cd packages/backend && pnpm run dev) &

# Start frontend
(cd packages/frontend && pnpm run dev)
