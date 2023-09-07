#!/bin/bash

# Build the Next.js application Docker image
docker build -t nextjs-app -f Dockerfile .

# Build the PostgreSQL Docker image
docker build -t postgres-db -f postgres/Dockerfile.postgres ./postgres
