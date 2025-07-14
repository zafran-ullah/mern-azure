#!/bin/bash
# Local test script

echo "🧪 Testing server locally..."

# Start server in background
node index.js &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Test endpoints
echo "Testing /api/health..."
curl -f http://localhost:5000/api/health || echo "❌ Health check failed"

echo "Testing /api/hello..."
curl -f http://localhost:5000/api/hello || echo "❌ Hello endpoint failed"

echo "Testing root endpoint..."
curl -f http://localhost:5000/ || echo "❌ Root endpoint failed"

# Clean up
kill $SERVER_PID 2>/dev/null || true

echo "✅ Local testing completed"
