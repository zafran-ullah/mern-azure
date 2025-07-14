# MERN Stack Application on Azure

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application with complete Docker containerization and CI/CD deployment to Azure Web App.

---

## 📦 Tech Stack

- **Frontend**: React 19.1.0 with Create React App
- **Backend**: Express.js 4.18.2 + Node.js 18
- **Database**: MongoDB Atlas (Cloud)
- **Web Server**: Nginx (for serving React app)
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Cloud Platform**: Azure Web App with Container Registry (ACR)

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Client  │────│  Nginx (Port 80) │────│  Azure Web App  │
│   (Frontend)    │    │   Reverse Proxy   │    │   (Multi-cont.) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │ Express Server   │────│  MongoDB Atlas  │
                       │  (Backend API)   │    │   (Database)    │
                       │   (Port 5000)    │    └─────────────────┘
                       └──────────────────┘
```

---

## 📁 Project Structure

```
mern-app/
├── client/                    # React frontend
│   ├── src/
│   │   ├── App.js            # Main React component with API integration
│   │   └── ...
│   ├── nginx.conf            # Nginx configuration for reverse proxy
│   ├── Dockerfile            # Multi-stage build (React + Nginx)
│   └── package.json
│
├── server/                    # Express.js backend
│   ├── index.js              # Main server file with MongoDB integration
│   ├── Dockerfile            # Node.js container
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── .github/workflows/
│   └── deploy.yml            # CI/CD pipeline for Azure deployment
│
├── docker-compose.yml        # Local development setup
├── docker-compose.prod.yml   # Production deployment configuration
└── README.md
```

---

## 🚀 Features

### Frontend (React)
- ✅ Modern React 19 with Hooks
- ✅ User management interface (CRUD operations)
- ✅ Real-time API integration
- ✅ Environment-based API URL configuration
- ✅ Error handling and loading states
- ✅ Responsive design

### Backend (Express.js)
- ✅ RESTful API endpoints
- ✅ MongoDB integration with Mongoose
- ✅ CORS configuration
- ✅ Health check endpoint
- ✅ Environment-based configuration
- ✅ Graceful shutdown handling
- ✅ Request logging and error handling

### DevOps & Deployment
- ✅ Dockerized multi-container application
- ✅ Nginx reverse proxy for API routing
- ✅ Azure Container Registry (ACR) integration
- ✅ Automated CI/CD with GitHub Actions
- ✅ Environment variable management
- ✅ Container health checks
- ✅ Application logging and monitoring

---

## 🛠️ API Endpoints

| Method | Endpoint      | Description                    |
|--------|---------------|--------------------------------|
| GET    | `/`          | API information and endpoints  |
| GET    | `/api/health`| Health check and status        |
| GET    | `/api/hello` | Simple test endpoint           |
| GET    | `/api/users` | Get all users                  |
| POST   | `/api/users` | Create a new user              |

---

## 🏃‍♂️ Getting Started

### Prerequisites

- **Docker & Docker Desktop**
- **Node.js 18+** (for local development)
- **Azure account** (for deployment)
- **MongoDB Atlas account** (for database)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-app
   ```

2. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your MongoDB connection string
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Health Check**: http://localhost:5000/api/health

### Manual Setup (without Docker)

1. **Backend setup**
   ```bash
   cd server
   npm install
   npm start
   ```

2. **Frontend setup**
   ```bash
   cd client
   npm install
   npm start
   ```

---

## 🚢 Deployment to Azure

### Prerequisites
- Azure Web App for Containers
- Azure Container Registry (ACR)
- GitHub repository with required secrets

### Required GitHub Secrets

Add these secrets to your GitHub repository settings:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mernapp
AZURE_CREDENTIALS={"clientId":"...","clientSecret":"...","subscriptionId":"...","tenantId":"..."}
ACR_USERNAME=mernacr123
ACR_PASSWORD=your-acr-password
```

### Deployment Process

1. **Push to main branch** triggers GitHub Actions
2. **Docker images** are built and pushed to ACR
3. **Azure Web App** is configured with Docker Compose
4. **Environment variables** are set
5. **Application** is deployed and started

### Monitoring

- **Azure Portal**: Monitor app performance and logs
- **Health Check**: `https://mern-app-zafran.azurewebsites.net/api/health`
- **Application Insights**: Detailed telemetry and diagnostics

---

## 🔧 Configuration

### Environment Variables

#### Server (.env)
```bash
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://mern-app-zafran.azurewebsites.net
```

#### Azure Web App Settings
```bash
WEBSITES_PORT=80
WEBSITES_ENABLE_APP_SERVICE_STORAGE=false
WEBSITES_CONTAINER_START_TIME_LIMIT=600
DOCKER_ENABLE_CI=true
```

---

## 🧪 Testing

### Local Testing
```bash
# Test Docker build
./test-docker.sh

# Test server health
curl http://localhost:5000/api/health

# Test API endpoints
curl http://localhost:5000/api/users
```

### Production Testing
```bash
# Health check
curl https://mern-app-zafran.azurewebsites.net/api/health

# API test
curl https://mern-app-zafran.azurewebsites.net/api/hello
```

---

## 🔍 Troubleshooting

### Common Issues

1. **503 Service Unavailable**
   - Check container startup logs
   - Verify environment variables
   - Ensure MongoDB connection is valid

2. **Container startup timeouts**
   - Check `WEBSITES_CONTAINER_START_TIME_LIMIT` setting
   - Review application logs in Azure Portal

3. **Database connection issues**
   - Verify MongoDB Atlas connection string
   - Check network access settings in MongoDB Atlas
   - Ensure IP whitelist includes Azure regions

### Debugging Commands

```bash
# Check Azure Web App logs
az webapp log tail --name mern-app-zafran --resource-group mern-group

# Check container status
az webapp show --name mern-app-zafran --resource-group mern-group --query "state"

# Download logs
az webapp log download --name mern-app-zafran --resource-group mern-group
```

---

## 📈 Performance & Scaling

- **Container Health Checks**: Automatic container restart on failure
- **Nginx Caching**: Static asset caching for improved performance
- **Database Indexing**: Optimized MongoDB queries
- **CDN Ready**: Static assets can be served via Azure CDN
- **Horizontal Scaling**: Ready for Azure App Service scaling

---

## 🔐 Security Features

- **Environment Variables**: Secure credential management
- **CORS Configuration**: Controlled cross-origin requests
- **Container Security**: Non-root user execution
- **HTTPS**: SSL/TLS encryption via Azure
- **Input Validation**: API request validation

---

## 🏆 Achievements

- ✅ Successfully deployed MERN stack to Azure
- ✅ Fixed path-to-regexp errors with Express.js
- ✅ Implemented multi-container Docker architecture
- ✅ Set up automated CI/CD pipeline
- ✅ Configured MongoDB Atlas integration
- ✅ Resolved HTTP 503 errors
- ✅ Optimized container startup and health checks

---

## 📄 License

MIT License - feel free to use, modify, and distribute.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Support

- **Issues**: Create a GitHub issue
- **Documentation**: Check Azure documentation
- **Monitoring**: Use Azure Application Insights for detailed diagnostics

---

**🎉 Your MERN stack application is now running successfully on Azure!**

