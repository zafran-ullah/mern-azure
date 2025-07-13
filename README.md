# MERN Stack Application with Docker and CI/CD on Azure

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application, fully dockerized and ready for CI/CD deployment to Azure via GitHub Actions.

---

## 📦 Tech Stack

- **Frontend**: React
- **Backend**: Express + Node.js
- **Database**: MongoDB (can be integrated)
- **DevOps**: Docker, GitHub Actions, Azure Web App

---

## 📁 Project Structure

├── client/ # React frontend
├── server/ # Express backend
├── docker-compose.yml
├── .github/workflows/deploy.yml


---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Docker & Docker Desktop
- Node.js (optional for local dev)
- Azure account (for deployment)

### Run locally with Docker Compose

```bash
docker-compose up --build
React app → http://localhost:3000/

Express API → http://localhost:5000/api/hello

🐳 Docker Overview
Each service (frontend and backend) has its own Dockerfile.
Use docker-compose to orchestrate them together.

🛠️ Deployment to Azure
This repo includes a GitHub Actions workflow (.github/workflows/deploy.yml) to deploy to Azure Web App using Docker Compose.

Make sure to add AZURE_CREDENTIALS as a GitHub Secret for authentication.

🔐 Environment Variables
Create .env files in both client/ and server/ folders if needed.

Example (server/.env):

PORT=5000
MONGO_URI=mongodb://your_mongo_uri


📄 License
MIT – feel free to use, modify, and share.

