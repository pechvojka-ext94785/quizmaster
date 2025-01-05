#!/bin/bash
set -e  # Exit on error
echo 'export PATH="$PATH:/workspaces/quizmaster/frontend/node/bin"' >> ~/.bashrc

cd backend

# Create quizmaster user and database
psql -U postgres -f create_db.sql

# Install Node.js and pnpm
./gradlew installFrontend
