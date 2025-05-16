#!/bin/bash

# Build shared package
pnpm -w build

# Link packages
pnpm -w link @live-tracking/shared
