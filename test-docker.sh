#!/bin/bash
# Local Docker build test

echo "🐳 Testing Docker build locally..."

# Build the image
echo "Building Docker image..."
docker build -t mern-server-test ./server

if [ $? -eq 0 ]; then
    echo "✅ Docker build successful"
    
    # Test run the container
    echo "Testing container..."
    docker run -d --name test-container -p 5000:5000 mern-server-test
    
    # Wait for startup
    sleep 10
    
    # Test if it's running
    if curl -f http://localhost:5000/api/health; then
        echo "✅ Container is running and healthy"
    else
        echo "❌ Container health check failed"
        echo "Container logs:"
        docker logs test-container
    fi
    
    # Cleanup
    docker stop test-container
    docker rm test-container
    docker rmi mern-server-test
else
    echo "❌ Docker build failed"
    exit 1
fi
