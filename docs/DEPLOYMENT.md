# Cloud Deployment Guide

This guide explains how to deploy the Enterprise Mini ERP + CRM Portal to production on **Render** (or using Docker).

---

## 🚀 Option 1: 1-Click Render Blueprint (Recommended)

Render Blueprints let you set up the database, backend API, and frontend website automatically in one step using the included `render.yaml` file.

1. Push your repository to GitHub.
2. Sign in to your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** ➔ **Blueprint**.
4. Connect your GitHub repository.
5. Render will detect `render.yaml` and create three services:
   - **minierp-postgres** (Managed PostgreSQL Database)
   - **minierp-backend** (Express Node Web Service)
   - **minierp-frontend** (React Static Site)
6. Click **Apply** to complete deployment.

---

## 🛠️ Option 2: Manual Setup on Render

If you prefer to configure each service manually on Render:

### Step 1: Create the PostgreSQL Database
1. Go to your [Render Dashboard](https://dashboard.render.com/) and click **New +** ➔ **PostgreSQL**.
2. Name the database `minierp-postgres`.
3. Choose the Free or Starter plan.
4. Click **Create Database**.
5. Once ready, copy the **Internal Database URL**.

### Step 2: Deploy the Backend API
1. Click **New +** ➔ **Web Service** on Render.
2. Select your GitHub repository.
3. Use the following settings:
   - **Name**: `minierp-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run render:build`
   - **Start Command**: `npm run render:start`
4. Add these Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_URL`: `<Paste Internal Database URL from Step 1>`
   - `JWT_ACCESS_SECRET`: `<Enter a secret key>`
   - `JWT_REFRESH_SECRET`: `<Enter a secret key>`
   - `CORS_ORIGIN`: `*`
5. Click **Create Web Service**.

### Step 3: Deploy the Frontend Website
1. Click **New +** ➔ **Static Site** on Render.
2. Select your GitHub repository.
3. Use the following settings:
   - **Name**: `minierp-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add an Environment Variable:
   - `VITE_API_BASE_URL`: `https://minierp-backend.onrender.com/api` *(Use your backend URL)*
5. Add a Rewrite Rule under Settings:
   - Source: `/*` ➔ Destination: `/index.html` (Required for React page routing)

---

## 🐳 Option 3: Self-Hosted Docker Deployment

To run the whole system on your own VPS or local machine using Docker:

```bash
docker-compose up -d --build
```

Your services will be available at:
- **Frontend App**: `http://localhost`
- **Backend API**: `http://localhost:5000/api`
- **Swagger Documentation**: `http://localhost:5000/api-docs`
