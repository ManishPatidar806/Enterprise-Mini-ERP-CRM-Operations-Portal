# Enterprise Mini ERP + CRM Deployment Guide

This document provides step-by-step instructions to deploy the application on production cloud services:
- **Database**: Render PostgreSQL (Managed Database)
- **Backend API**: Render (Node.js Web Service)
- **Frontend App**: Render / Vercel (Static Web Application)

---

## 🚀 Option 1: 1-Click Render Blueprint Deployment (Recommended)

Render Blueprints automatically provision the **PostgreSQL Database**, **Backend Web Service**, and **Frontend Static Site** in a single step using `render.yaml`.

1. Push your repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New** ➔ **Blueprint**.
3. Connect your GitHub repository.
4. Render will auto-detect `render.yaml` and prompt you to create the resources:
   - **minierp-postgres** (PostgreSQL Managed Database)
   - **minierp-backend** (Web Service)
   - **minierp-frontend** (Static Site)
5. Click **Apply**. Render will deploy all services automatically!

---

## 🛠️ Option 2: Manual Render Setup

### Step 1: Create Render PostgreSQL Database
1. Go to [Render Dashboard](https://dashboard.render.com/) ➔ Click **New +** ➔ **PostgreSQL**.
2. Set Name: `minierp-postgres`, Database: `minierp`, User: `minierp_user`.
3. Select Plan (Free / Starter).
4. Click **Create Database**.
5. Once created, copy the **Internal Database URL** (or External Database URL).

### Step 2: Deploy Backend Service on Render
1. Click **New +** ➔ **Web Service** on Render.
2. Select your GitHub repository.
3. Configure settings:
   - **Name**: `minierp-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run render:build`
   - **Start Command**: `npm run render:start`
4. Add **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_URL`: `<Paste Render PostgreSQL Database URL>`
   - `JWT_ACCESS_SECRET`: `<Generate a secure random string>`
   - `JWT_REFRESH_SECRET`: `<Generate a secure random string>`
   - `CORS_ORIGIN`: `*` (or your frontend domain URL)
5. Click **Create Web Service**.

---

## 🌐 Option 3: Frontend Deployment (Render / Vercel)

### Option A: Render Static Site
1. Click **New +** ➔ **Static Site**.
2. Select your GitHub repository.
3. Settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add **Environment Variable**:
   - `VITE_API_BASE_URL`: `https://minierp-backend.onrender.com/api` (Replace with your backend URL)
5. Add **Rewrite Rule** under Settings:
   - Source: `/*` ➔ Destination: `/index.html` (for SPA routing)

### Option B: Vercel
1. Sign up at [vercel.com](https://vercel.com) and import your GitHub repository.
2. Select `frontend` as Root Directory.
3. Build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Environment Variable:
   - `VITE_API_BASE_URL`: `https://minierp-backend.onrender.com/api`
5. Click **Deploy**.

---

## 🚂 Option 4: Railway Deployment (Alternative)

1. Log in to [Railway.app](https://railway.app).
2. Click **+ New** ➔ **Database** ➔ **Add PostgreSQL**.
3. Click **+ New** ➔ **GitHub Repo** ➔ Select repository, set Root Directory to `backend`.
4. Railway auto-detects `backend/railway.json`.
5. Set environment variables (`DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CORS_ORIGIN`).

---

## 🐳 Option 5: Self-Hosted Docker Compose

To run the full stack locally or on a VPS using Docker:

```bash
docker-compose up -d --build
```

Access services:
- **Frontend App**: `http://localhost`
- **Backend API**: `http://localhost:5000/api`
- **Swagger Docs**: `http://localhost:5000/api-docs`
