#!/bin/bash
# Startup validation script

echo "🔍 Validating server startup..."

# Check if required environment variables are set
if [ -z "$MONGODB_URI" ]; then
    echo "⚠️  Warning: MONGODB_URI not set, using default"
fi

if [ -z "$PORT" ]; then
    echo "⚠️  Warning: PORT not set, using default 5000"
fi

# Check if the server is responsive
echo "🚀 Starting server validation..."
timeout 30 bash -c 'until curl -f http://localhost:5000/api/health; do sleep 1; done' || {
    echo "❌ Server failed to start or health check failed"
    exit 1
}

echo "✅ Server started successfully and health check passed"
