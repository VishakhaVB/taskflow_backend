# TaskFlow Backend API

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-13AA52?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![JWT Auth](https://img.shields.io/badge/JWT-Authentication-blueviolet?style=flat-square)](https://jwt.io/)
[![REST API](https://img.shields.io/badge/API-REST-blue?style=flat-square)](https://restfulapi.net/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**A robust, scalable REST API for comprehensive task and project management**

[API Documentation](#api-endpoints-documentation) • [Features](#features) • [Quick Start](#installation--local-setup) • [Authentication](#authentication--authorization-flow)

</div>

---

## 📋 Table of Contents

1. [Project Description](#project-description)
2. [Architecture Overview](#architecture-overview)
3. [Tech Stack](#tech-stack)
4. [Features](#features)
5. [API Endpoints Documentation](#api-endpoints-documentation)
6. [Request & Response Examples](#request--response-examples)
7. [Authentication & Authorization Flow](#authentication--authorization-flow)
8. [Database Schema](#database-schema--models)
9. [Folder Structure](#folder-structure)
10. [Installation & Local Setup](#installation--local-setup)
11. [Environment Variables](#environment-variables)
12. [Running the Server](#running-the-server)
13. [Deployment Instructions](#deployment-instructions)
14. [Security Best Practices](#security-best-practices-implemented)
15. [Error Handling Strategy](#error-handling-strategy)
16. [Logging & Monitoring](#logging--monitoring)
17. [Testing Instructions](#testing-instructions)
18. [Performance Optimizations](#performance-optimizations)
19. [Future Enhancements](#future-enhancements)
20. [Contributing Guidelines](#contributing-guidelines)
21. [License](#license)
22. [Author & Contact](#author--contact-info)

---

## 🎯 Project Description

**TaskFlow Backend API** is a comprehensive REST API backend built with **Node.js** and **Express.js** that powers a modern task and project management application. This production-grade API provides seamless user authentication, project management, task tracking, and real-time collaboration features.

The system is designed to handle concurrent users, secure API requests with JWT tokens, enforce role-based access control, and maintain data integrity through robust error handling and validation.

**Live Deployment:** [https://api.taskflow.com](https://api.taskflow.com)  
**Frontend Repository:** Our React frontend consumes this API for an interactive user experience.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express.js Server                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes Layer     │   Controllers   │   Services    │  │
│  │  (/api/v1/...)     │   (Business     │   (Database  │  │
│  │                    │    Logic)       │    Access)   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middleware Layer (Auth, Validation, Error Handling)│  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────────────┘
                 │ TCP/IP
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              MongoDB Database Cluster                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Collections: Users | Projects | Tasks             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Architecture Principles:**
- **Modular Design:** Separation of concerns with distinct layers
- **Middleware Pattern:** Centralized request processing
- **RESTful Standards:** Standard HTTP methods and status codes
- **JWT-Based Security:** Stateless authentication
- **Error Isolation:** Comprehensive error handling and logging

---

## 🛠️ Tech Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Runtime** | Node.js | 20.x | JavaScript runtime |
| **Framework** | Express.js | 4.x | Web application framework |
| **Database** | MongoDB | 6.x | NoSQL document database |
| **Authentication** | JWT (jsonwebtoken) | 9.x | Token-based authentication |
| **Password Security** | bcryptjs | 2.4.x | Password hashing |
| **Environment Config** | dotenv | 16.x | Environment variables |
| **Data Validation** | Joi | 17.x | Schema validation |
| **CORS** | cors | 2.8.x | Cross-Origin Resource Sharing |
| **Logging** | winston | 3.x | Structured logging |
| **Testing** | Jest | 29.x | Unit testing framework |
| **API Client** | Axios | 1.x | HTTP client for requests |

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ JWT-based stateless authentication
- ✅ Secure password hashing with bcryptjs
- ✅ User registration and login
- ✅ Email verification support
- ✅ Password reset functionality
- ✅ Role-based access control (Admin, User)
- ✅ Token refresh mechanism (access + refresh tokens)

### 📂 Project Management
- ✅ Create, read, update, delete (CRUD) projects
- ✅ Project ownership and member management
- ✅ Project status tracking (Active, On Hold, Completed, Archived)
- ✅ Assign users as project collaborators
- ✅ Project description and metadata

### ✅ Task Management
- ✅ Create and assign tasks to projects
- ✅ Task status workflow (To Do, In Progress, Review, Completed)
- ✅ Priority levels (Low, Medium, High, Critical)
- ✅ Due date and deadline tracking
- ✅ Task assignments and ownership
- ✅ Task comments and activity timeline
- ✅ Task filtering and sorting

### 📊 Data Management
- ✅ Advanced filtering and pagination
- ✅ Full-text search capabilities
- ✅ Data export functionality
- ✅ Bulk operations support

### 🔒 Security Features
- ✅ HTTPS enforcement (production)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation and sanitization
- ✅ SQL/NoSQL injection prevention
- ✅ XSS protection
- ✅ CSRF token support

---

## 📡 API Endpoints Documentation

### Base URL
```
Development:  http://localhost:5000/api/v1
Production:   https://api.taskflow.com/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `POST` | `/auth/register` | User registration | ❌ No |
| `POST` | `/auth/login` | User login | ❌ No |
| `POST` | `/auth/refresh` | Refresh access token | ✅ Yes |
| `POST` | `/auth/logout` | User logout | ✅ Yes |
| `POST` | `/auth/forgot-password` | Request password reset | ❌ No |
| `POST` | `/auth/reset-password` | Reset password with token | ❌ No |
| `GET` | `/auth/verify-email` | Verify email address | ❌ No |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/users/profile` | Get current user profile | ✅ Yes |
| `PUT` | `/users/profile` | Update user profile | ✅ Yes |
| `GET` | `/users/:userId` | Get user details (public) | ❌ No |
| `DELETE` | `/users/profile` | Delete user account | ✅ Yes |
| `PUT` | `/users/profile/password` | Change password | ✅ Yes |

### Project Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/projects` | List all projects (paginated) | ✅ Yes |
| `POST` | `/projects` | Create new project | ✅ Yes |
| `GET` | `/projects/:projectId` | Get project details | ✅ Yes |
| `PUT` | `/projects/:projectId` | Update project | ✅ Yes |
| `DELETE` | `/projects/:projectId` | Delete project | ✅ Yes |
| `POST` | `/projects/:projectId/members` | Add project member | ✅ Yes |
| `DELETE` | `/projects/:projectId/members/:userId` | Remove project member | ✅ Yes |
| `GET` | `/projects/:projectId/tasks` | Get project tasks | ✅ Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/tasks` | List all tasks (paginated) | ✅ Yes |
| `POST` | `/tasks` | Create new task | ✅ Yes |
| `GET` | `/tasks/:taskId` | Get task details | ✅ Yes |
| `PUT` | `/tasks/:taskId` | Update task | ✅ Yes |
| `DELETE` | `/tasks/:taskId` | Delete task | ✅ Yes |
| `PATCH` | `/tasks/:taskId/status` | Update task status | ✅ Yes |
| `PATCH` | `/tasks/:taskId/assign` | Assign task to user | ✅ Yes |
| `POST` | `/tasks/:taskId/comments` | Add task comment | ✅ Yes |
| `GET` | `/tasks/:taskId/comments` | Get task comments | ✅ Yes |
| `DELETE` | `/tasks/:taskId/comments/:commentId` | Delete comment | ✅ Yes |

---

## 📝 Request & Response Examples

### 1. User Registration

**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "createdAt": "2025-02-11T10:30:00Z"
  },
  "token": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

### 2. User Login

**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "firstName": "John",
    "role": "user"
  },
  "token": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

### 3. Create Project

**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Website Redesign",
    "description": "Complete redesign of company website",
    "status": "Active",
    "dueDate": "2025-06-30"
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "projectId": "507f1f77bcf86cd799439012",
    "name": "Website Redesign",
    "description": "Complete redesign of company website",
    "ownerId": "507f1f77bcf86cd799439011",
    "status": "Active",
    "members": ["507f1f77bcf86cd799439011"],
    "dueDate": "2025-06-30",
    "createdAt": "2025-02-11T10:35:00Z",
    "updatedAt": "2025-02-11T10:35:00Z"
  }
}
```

### 4. Create Task

**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "projectId": "507f1f77bcf86cd799439012",
    "title": "Design Homepage",
    "description": "Create mockups and design for homepage",
    "priority": "High",
    "status": "To Do",
    "assignedTo": "507f1f77bcf86cd799439011",
    "dueDate": "2025-03-15"
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "taskId": "507f1f77bcf86cd799439013",
    "projectId": "507f1f77bcf86cd799439012",
    "title": "Design Homepage",
    "description": "Create mockups and design for homepage",
    "priority": "High",
    "status": "To Do",
    "assignedTo": "507f1f77bcf86cd799439011",
    "createdBy": "507f1f77bcf86cd799439011",
    "dueDate": "2025-03-15",
    "createdAt": "2025-02-11T10:40:00Z",
    "updatedAt": "2025-02-11T10:40:00Z"
  }
}
```

### 5. Get Project Tasks (with Pagination & Filtering)

**Request:**
```bash
curl -X GET "http://localhost:5000/api/v1/projects/507f1f77bcf86cd799439012/tasks?page=1&limit=10&status=In%20Progress&priority=High" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "taskId": "507f1f77bcf86cd799439014",
      "title": "Design Homepage",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2025-03-15",
      "assignedTo": {
        "userId": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 25,
    "totalPages": 3
  }
}
```

### 6. Error Response Example

**Request:**
```bash
curl -X GET http://localhost:5000/api/v1/projects/invalid-id \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid project ID format",
  "errorCode": "INVALID_ID_FORMAT",
  "timestamp": "2025-02-11T10:45:00Z",
  "path": "/api/v1/projects/invalid-id"
}
```

---

## 🔐 Authentication & Authorization Flow

### JWT Token Flow

```
┌────────────────┐
│   User Login   │
└────────┬───────┘
         │
         ▼
┌──────────────────────────────┐
│  Verify Credentials          │
│  (Email + Password)          │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Issue Tokens                │
│  - Access Token (1 hour)     │
│  - Refresh Token (7 days)    │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Client Store Tokens         │
│  (LocalStorage)              │
└──────────────────────────────┘
```

### Token Structure

**Access Token (JWT):**
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "userId": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "role": "user",
  "iat": 1707641400,
  "exp": 1707645000
}

Signature: [HMAC-SHA256]
```

### Authorization Levels

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management, project oversight |
| **User** | Create/manage own projects, manage assigned tasks |
| **Viewer** | Read-only access to shared projects |

### Protected Route Example

```bash
# Request with Bearer Token
curl -X GET http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Without token → 401 Unauthorized
# Invalid token → 401 Unauthorized
# Expired token → 401 Token Expired (Refresh needed)
```

---

## 🗄️ Database Schema & Models

### User Model

```json
{
  "_id": "ObjectId",
  "firstName": "string",
  "lastName": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "role": "enum: ['user', 'admin', 'viewer']",
  "profilePicture": "string (URL)",
  "isEmailVerified": "boolean",
  "isActive": "boolean",
  "lastLogin": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Project Model

```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "ownerId": "ObjectId (reference: User)",
  "members": ["ObjectId (reference: User)"],
  "status": "enum: ['Active', 'On Hold', 'Completed', 'Archived']",
  "dueDate": "Date",
  "priority": "enum: ['Low', 'Medium', 'High', 'Critical']",
  "createdBy": "ObjectId (reference: User)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Task Model

```json
{
  "_id": "ObjectId",
  "projectId": "ObjectId (reference: Project)",
  "title": "string",
  "description": "string",
  "status": "enum: ['To Do', 'In Progress', 'Review', 'Completed']",
  "priority": "enum: ['Low', 'Medium', 'High', 'Critical']",
  "assignedTo": "ObjectId (reference: User)",
  "createdBy": "ObjectId (reference: User)",
  "dueDate": "Date",
  "estimatedHours": "number",
  "comments": [
    {
      "commentId": "ObjectId",
      "userId": "ObjectId (reference: User)",
      "text": "string",
      "createdAt": "Date"
    }
  ],
  "attachments": ["string (URLs)"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Database Indexes

```javascript
// Users collection
db.users.createIndex({ email: 1 }, { unique: true });

// Projects collection
db.projects.createIndex({ ownerId: 1 });
db.projects.createIndex({ createdAt: -1 });

// Tasks collection
db.tasks.createIndex({ projectId: 1 });
db.tasks.createIndex({ assignedTo: 1 });
db.tasks.createIndex({ status: 1 });
db.tasks.createIndex({ dueDate: 1 });
```

---

## 📂 Folder Structure

```
backend/
├── src/
│   ├── app.js                 # Express app initialization
│   ├── server.js              # Server entry point
│   │
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── project.controller.js
│   │   └── task.controller.js
│   │
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Project.model.js
│   │   └── Task.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── projects.routes.js
│   │   └── tasks.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT verification
│   │   ├── validation.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   └── cors.middleware.js
│   │
│   ├── utils/
│   │   ├── response.js          # Standard response formatter
│   │   ├── logger.js            # Logging utility
│   │   ├── validators.js        # Input validation
│   │   └── constants.js         # App constants
│   │
│   └── services/
│       ├── auth.service.js
│       ├── user.service.js
│       ├── project.service.js
│       └── task.service.js
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── .env.example               # Example environment variables
├── .env                       # Environment variables (git ignored)
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js                  # Application entry point
```

---

## 🚀 Installation & Local Setup

### Prerequisites

- **Node.js**: v20.x or higher
- **MongoDB**: v6.x or higher (local or cloud)
- **npm**: v10.x or higher
- **Git**: For version control

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/taskflow-backend.git
cd taskflow-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all dependencies from `package.json`:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- cors
- joi

### Step 3: Setup MongoDB

**Option A: Local MongoDB**
```bash
# On Windows (if installed)
mongod

# On macOS
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/database`

### Step 4: Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env with your values
nano .env
```

See [Environment Variables](#environment-variables) section below.

### Step 5: Verify Installation

```bash
# Check Node version
node --version
# Expected: v20.x.x

# Check npm version
npm --version
# Expected: v10.x.x

# Test imports
node -e "const express = require('express'); console.log('✓ Express loaded')"
```

---

## 🔑 Environment Variables

### .env File Template

Create a `.env` file in the root directory with the following variables:

```bash
# ============================================
# SERVER CONFIGURATION
# ============================================
NODE_ENV=development
PORT=5000
API_VERSION=v1

# ============================================
# DATABASE CONFIGURATION
# ============================================
MONGODB_URI=mongodb://localhost:27017/taskflow
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority

MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_DATABASE=taskflow

# ============================================
# JWT CONFIGURATION
# ============================================
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=1h
JWT_REFRESH_SECRET=your_refresh_token_secret_min_32_chars
JWT_REFRESH_EXPIRE=7d

# ============================================
# EMAIL CONFIGURATION
# ============================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@taskflow.com

# ============================================
# CORS CONFIGURATION
# ============================================
CORS_ORIGIN=http://localhost:3000,https://taskflow.com
CORS_CREDENTIALS=true

# ============================================
# SECURITY
# ============================================
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ============================================
# LOGGING
# ============================================
LOG_LEVEL=debug
LOG_FILE=./logs/app.log

# ============================================
# EXTERNAL SERVICES
# ============================================
FRONTEND_URL=http://localhost:3000
DEPLOYMENT_URL=https://api.taskflow.com

# ============================================
# FEATURE FLAGS (Optional)
# ============================================
ENABLE_EMAIL_VERIFICATION=true
ENABLE_TWO_FACTOR_AUTH=false
ENABLE_ANALYTICS=true
```

### .env.example (commit to git)

```bash
NODE_ENV=development
PORT=5000
API_VERSION=v1

MONGODB_URI=mongodb://localhost:27017/taskflow
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_DATABASE=taskflow

JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=1h
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRE=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=noreply@taskflow.com

CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

LOG_LEVEL=debug
LOG_FILE=./logs/app.log

FRONTEND_URL=http://localhost:3000
DEPLOYMENT_URL=https://api.taskflow.com

ENABLE_EMAIL_VERIFICATION=true
ENABLE_TWO_FACTOR_AUTH=false
ENABLE_ANALYTICS=true
```

---

## 🎮 Running the Server

### Development Mode (with auto-reload)

```bash
# Install nodemon globally
npm install -g nodemon

# Start server with auto-reload
npm run dev
```

**Expected Output:**
```
[12:30:45] Starting server...
[12:30:46] MongoDB connected successfully
[12:30:46] Server running on http://localhost:5000
[12:30:46] API version: v1
[12:30:46] Environment: development
```

### Production Mode

```bash
npm start
```

### On Different Port

```bash
PORT=8000 npm start
```

### Health Check Endpoint

```bash
curl http://localhost:5000/api/v1/health

# Response
{
  "status": "OK",
  "timestamp": "2025-02-11T12:30:45Z",
  "uptime": 125.43,
  "mongoDb": "connected",
  "memoryUsage": {
    "heapUsed": "45MB",
    "heapTotal": "128MB"
  }
}
```

### Stopping the Server

```bash
# Press Ctrl + C in terminal
```

---

## 🌐 Deployment Instructions

### Deployment to Heroku

**Step 1: Install Heroku CLI**
```bash
npm install -g heroku
```

**Step 2: Login to Heroku**
```bash
heroku login
```

**Step 3: Create Heroku App**
```bash
heroku create taskflow-api
```

**Step 4: Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskflow
heroku config:set JWT_SECRET=your_secret_key
# ... set all other variables
```

**Step 5: Deploy**
```bash
git push heroku main
```

**Step 6: Verify Deployment**
```bash
heroku logs --tail
```

### Deployment to AWS EC2

**Step 1: SSH into Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

**Step 2: Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs npm
```

**Step 3: Clone Repository**
```bash
git clone https://github.com/yourusername/taskflow-backend.git
cd taskflow-backend
npm install
```

**Step 4: Setup PM2 for Process Management**
```bash
npm install -g pm2
pm2 start server.js --name "taskflow-api"
pm2 startup
pm2 save
```

**Step 5: Setup Nginx Reverse Proxy**
```bash
sudo apt-get install nginx
# Configure nginx at /etc/nginx/sites-available/default
sudo systemctl restart nginx
```

### Deployment to Docker

**Dockerfile:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**Build and Run:**
```bash
docker build -t taskflow-api:1.0 .
docker run -p 5000:5000 --env-file .env taskflow-api:1.0
```

### Monitoring in Production

```bash
# Check server logs
pm2 logs taskflow-api

# Monitor process
pm2 monit

# View status
pm2 status
```

---

## 🔒 Security Best Practices Implemented

### 1. **Password Security**
- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ No plaintext password storage
- ✅ Minimum password requirements enforced
- ✅ Password reset via secure token

### 2. **JWT Token Security**
- ✅ Access tokens expire in 1 hour
- ✅ Refresh tokens expire in 7 days
- ✅ Tokens signed with strong secret (256+bits)
- ✅ Token blacklisting on logout

### 3. **Request Validation**
- ✅ Input sanitization with Joi
- ✅ Type validation on all endpoints
- ✅ Length limits on string fields
- ✅ Email format validation

### 4. **Database Security**
- ✅ MongoDB authentication enabled
- ✅ Principle of least privilege for DB user
- ✅ Connection encrypted (MongoDB Atlas)
- ✅ Regular database backups

### 5. **HTTP Security**
- ✅ HTTPS enforcement in production
- ✅ CORS properly configured
- ✅ CSRF protection enabled
- ✅ Security headers (Helmet.js recommended)

### 6. **Rate Limiting**
- ✅ 100 requests per 15 minutes per IP
- ✅ Stricter limits on auth endpoints
- ✅ Dynamic rate limiting for authenticated users

### 7. **API Security**
- ✅ API versioning (/api/v1/)
- ✅ Request/response logging
- ✅ Error message sanitization
- ✅ No sensitive data in logs

### 8. **Access Control**
- ✅ Role-Based Access Control (RBAC)
- ✅ User ownership validation
- ✅ Project membership verification
- ✅ Task assignment authorization

### Security Checklist for Production

```bash
# Enable HTTPS
# ✓ SSL Certificate installed
# ✓ HSTS headers enabled

# Database Validation
# ✓ MongoDB authentication on
# ✓ Firewall rules configured

# Environment
# ✓ NODE_ENV=production
# ✓ All secrets in .env
# ✓ .env file git-ignored

# Monitoring
# ✓ Error tracking enabled
# ✓ Log aggregation setup
# ✓ Alerts configured
```

---

## ⚠️ Error Handling Strategy

### Error Response Format

All errors follow a consistent structure:

```json
{
  "success": false,
  "message": "User-friendly error message",
  "errorCode": "TECHNICAL_ERROR_CODE",
  "statusCode": 400,
  "timestamp": "2025-02-11T12:30:45Z",
  "path": "/api/v1/endpoint",
  "details": {
    "field": "error details"
  }
}
```

### HTTP Status Codes

| Code | Meaning | Example Scenario |
|------|---------|------------------|
| `200` | OK | Successful request |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid input, missing fields |
| `401` | Unauthorized | Missing or invalid token |
| `403` | Forbidden | No permission for resource |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Email already registered |
| `422` | Unprocessable Entity | Validation error |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Unexpected server error |
| `503` | Service Unavailable | Database connection error |

### Common Error Codes

```javascript
INVALID_CREDENTIALS          // Wrong email/password
INVALID_TOKEN               // Malformed JWT
TOKEN_EXPIRED               // Token expiration
UNAUTHORIZED_ACCESS         // Missing authentication
FORBIDDEN_RESOURCE          // User lacks permission
RESOURCE_NOT_FOUND          // 404
VALIDATION_FAILED           // Input validation error
DUPLICATE_EMAIL             // Email already exists
INVALID_ID_FORMAT           // Invalid MongoDB ObjectId
DATABASE_ERROR              // MongoDB error
INTERNAL_SERVER_ERROR       // Unexpected error
```

### Global Error Handler Middleware

```javascript
// All errors caught and formatted consistently
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
  
  return res.status(statusCode).json({
    success: false,
    message: err.message,
    errorCode,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

---

## 📊 Logging & Monitoring

### Logging Structure

All requests are logged with:
- **Method** and **URL**
- **Status Code** and **Response Time**
- **User Info** (if authenticated)
- **Error Messages** (if applicable)

**Log Example:**
```
[2025-02-11T12:30:45.123Z] INFO     POST /api/v1/auth/login - 200 - 45ms - user:john@example.com
[2025-02-11T12:30:46.456Z] INFO     GET /api/v1/projects - 200 - 120ms - user:john@example.com
[2025-02-11T12:30:47.789Z] ERROR    POST /api/v1/tasks - 400 - 15ms - VALIDATION_FAILED
```

### Logging Levels

```
ERROR    - Critical failures (500 errors, DB failures)
WARN     - Warnings (deprecated endpoints, rate limit approaching)
INFO     - Informational (successful requests, user actions)
DEBUG    - Debugging (request details, middleware flow)
TRACE    - Detailed tracing (variable values, function calls)
```

### Setup Winston Logger

```bash
npm install winston
```

**Log Files Location:**
```
logs/
├── app.log           # All logs
├── error.log         # Error logs only
└── combined.log      # Combined rotated logs
```

### Suggested Monitoring Tools

- **Error Tracking**: Sentry, Rollbar
- **Performance**: New Relic, DataDog
- **Log Aggregation**: ELK Stack, Papertrail
- **Uptime Monitoring**: Pingdom, UptimeRobot

---

## 🧪 Testing Instructions

### Setup Testing Framework

```bash
npm install --save-dev jest supertest
```

### Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/auth.test.js

# Watch mode (auto-run on changes)
npm run test:watch
```

### Test Structure

```
tests/
├── unit/
│   ├── auth.controller.test.js
│   ├── project.controller.test.js
│   └── task.controller.test.js
│
├── integration/
│   ├── auth.integration.test.js
│   ├── projects.integration.test.js
│   └── tasks.integration.test.js
│
└── fixtures/
    ├── user.fixture.js
    ├── project.fixture.js
    └── task.fixture.js
```

### Sample Unit Test

```javascript
describe('Auth Controller', () => {
  describe('POST /register', () => {
    it('should register a new user with valid data', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'SecurePassword123!'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe('john@example.com');
    });

    it('should return 400 if email already exists', async () => {
      // Test implementation
    });
  });
});
```

### Testing with Postman

1. **Import Collection**: Use provided Postman collection
2. **Set Environment**: Configure dev/production endpoints
3. **Run Tests**: Use Postman test runner
4. **Generate Report**: Export test results

**Sample Postman Test:**
```javascript
pm.test("Registration successful", function () {
    pm.response.to.have.status(201);
    pm.expect(pm.response.json().success).to.eql(true);
});
```

---

## ⚡ Performance Optimizations

### Database Optimization

```javascript
// 1. Indexing on frequently queried fields
db.users.createIndex({ email: 1 });
db.projects.createIndex({ ownerId: 1 });
db.tasks.createIndex({ projectId: 1, status: 1 });

// 2. Projection (select only needed fields)
db.users.find({ email: "john@example.com" }, { password: 0 });

// 3. Pagination (avoid loading all records)
db.tasks.find().skip(10).limit(20);
```

### Query Optimization

```javascript
// Before: N+1 Query Problem
const projects = await Project.find({ ownerId: userId });
for (let project of projects) {
  project.members = await User.find({ _id: { $in: project.memberIds } });
}

// After: Population with Mongoose
const projects = await Project.find({ ownerId: userId })
  .populate('memberIds', 'firstName lastName email');
```

### Caching Strategy

```javascript
// Redis caching for frequently accessed data
const redis = require('redis');
const client = redis.createClient();

// Cache: user profile (1 hour TTL)
const getUserProfile = async (userId) => {
  const cached = await client.get(`user:${userId}`);
  if (cached) return JSON.parse(cached);
  
  const user = await User.findById(userId);
  await client.setEx(`user:${userId}`, 3600, JSON.stringify(user));
  return user;
};
```

### Response Compression

```javascript
const compression = require('compression');
app.use(compression());
```

### Async/Await Best Practices

```javascript
// Use Promise.all() for parallel operations
const [user, projects, tasks] = await Promise.all([
  User.findById(userId),
  Project.find({ ownerId: userId }),
  Task.find({ createdBy: userId })
]);
```

### Monitoring Metrics

| Metric | Target | Tool |
|--------|--------|------|
| Response Time | < 200ms | New Relic |
| DB Query Time | < 100ms | MongoDB Atlas |
| Throughput | > 1000 req/s | LoadTesting |
| Error Rate | < 0.1% | Sentry |
| CPU Usage | < 70% | CloudWatch |
| Memory Usage | < 80% | DataDog |

---

## 🚀 Future Enhancements

### Short Term (Next 3 months)
- [ ] Implement task comments and activity timeline
- [ ] Add file attachment support (AWS S3 integration)
- [ ] Email notifications for task assignments
- [ ] Real-time updates using WebSockets
- [ ] Advanced task filtering and search
- [ ] Project templates library

### Medium Term (3-6 months)
- [ ] Two-factor authentication (2FA)
- [ ] Audit logging for compliance
- [ ] Advanced reporting and analytics
- [ ] Team collaboration features
- [ ] API documentation portal (Swagger/OpenAPI)
- [ ] Webhook support for integrations

### Long Term (6-12 months)
- [ ] GraphQL support alongside REST
- [ ] Machine learning for task prioritization
- [ ] Integration marketplace (Slack, GitHub, etc.)
- [ ] Mobile app backend (iOS/Android)
- [ ] Time tracking and productivity insights
- [ ] Multi-language support (i18n)

### Planned Integrations
- 🔗 GitHub (pull request tracking)
- 🔗 Slack (notifications and commands)
- 🔗 Google Calendar (due date sync)
- 🔗 Jira (issue synchronization)
- 🔗 Zapier (automation workflows)

---

## 🤝 Contributing Guidelines

We welcome contributions! Please follow these guidelines:

### Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/taskflow-backend.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow coding standards
   - Add tests for new features
   - Update documentation

4. **Commit Changes**
   ```bash
   git commit -m "feat: Add new feature description"
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format

```
feat: Add user authentication
fix: Resolve database connection issue
docs: Update API documentation
test: Add unit tests for auth
refactor: Optimize database queries
chore: Update dependencies
```

### Code Standards

- **ESLint**: Use provided configuration
- **Prettier**: Auto-format code
- **Testing**: Minimum 80% coverage
- **Naming**: camelCase for variables/functions
- **Comments**: JSDoc for complex functions

### Running Code Quality Checks

```bash
npm run lint        # Run ESLint
npm run format      # Format with Prettier
npm run test        # Run tests
npm run coverage    # Generate coverage report
```

### Pull Request Process

1. Update README.md if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Request code review
5. Address review feedback

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

### MIT License Summary

You are free to:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute copies
- ✅ Private use

With conditions:
- ⚠️ Include license and copyright notice
- ⚠️ State changes made

---

## 👤 Author & Contact Info

**Project Created By:** Vishakha

### Contact & Links

- 📧 **Email**: vishakha@example.com
- 💼 **LinkedIn**: [linkedin.com/in/vishakha](https://linkedin.com/in/vishakha)
- 🐙 **GitHub**: [github.com/vishakha](https://github.com/vishakha)
- 🌐 **Website**: [www.vishakha.dev](https://www.vishakha.dev)

### Project Links

- 📝 **Repository**: [GitHub - TaskFlow Backend](https://github.com/yourusername/taskflow-backend)
- 🚀 **Live API**: [https://api.taskflow.com](https://api.taskflow.com)
- 📖 **API Docs**: [https://api.taskflow.com/docs](https://api.taskflow.com/docs)
- 🎨 **Frontend**: [React Application](https://github.com/yourusername/taskflow-frontend)

### Support

Found a bug or have a suggestion?
- 🐛 [Report an Issue](https://github.com/yourusername/taskflow-backend/issues)
- 💬 [Start a Discussion](https://github.com/yourusername/taskflow-backend/discussions)
- 📧 Email support: support@taskflow.com

---

## 📊 Repository Statistics

```
Language    Files    Lines
JavaScript   15       2,450
JSON         2         250
Total        17       2,700
```

### Quick Links

- [View Source Code](https://github.com/yourusername/taskflow-backend)
- [View Open Issues](https://github.com/yourusername/taskflow-backend/issues)
- [View Pull Requests](https://github.com/yourusername/taskflow-backend/pulls)
- [View Releases](https://github.com/yourusername/taskflow-backend/releases)

---

<div align="center">

### ⭐ Like this project? Give it a star! ⭐

[Star on GitHub](https://github.com/yourusername/taskflow-backend) | [Follow on GitHub](https://github.com/yourusername) | [Support](#support)

**Made with ❤️ by Vishakha**

Last Updated: February 11, 2025

</div>