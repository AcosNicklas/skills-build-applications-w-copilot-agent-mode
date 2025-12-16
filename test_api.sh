#!/bin/bash

# Test script for OctoFit Tracker API endpoints

# Determine base URL
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://$CODESPACE_NAME-8000.app.github.dev"
    echo "Testing in Codespace: $CODESPACE_NAME"
else
    BASE_URL="http://localhost:8000"
    echo "Testing locally"
fi

echo "Base URL: $BASE_URL"
echo ""

# Test API root
echo "=== Testing API Root ==="
curl -s "${BASE_URL}/api/" | python3 -m json.tool || curl -s "${BASE_URL}/api/"
echo ""

# Test Users endpoint
echo "=== Testing /api/users/ ==="
curl -s "${BASE_URL}/api/users/" | python3 -m json.tool | head -30
echo ""

# Test Teams endpoint
echo "=== Testing /api/teams/ ==="
curl -s "${BASE_URL}/api/teams/" | python3 -m json.tool | head -30
echo ""

# Test Activities endpoint
echo "=== Testing /api/activities/ ==="
curl -s "${BASE_URL}/api/activities/" | python3 -m json.tool | head -30
echo ""

# Test Workouts endpoint
echo "=== Testing /api/workouts/ ==="
curl -s "${BASE_URL}/api/workouts/" | python3 -m json.tool | head -30
echo ""

# Test Leaderboards endpoint
echo "=== Testing /api/leaderboards/ ==="
curl -s "${BASE_URL}/api/leaderboards/" | python3 -m json.tool | head -30
echo ""

echo "=== API Testing Complete ==="
