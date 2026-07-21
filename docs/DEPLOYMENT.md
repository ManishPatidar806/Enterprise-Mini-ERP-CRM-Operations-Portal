# Enterprise Mini ERP + CRM Deployment Guide

This document provides step-by-step instructions to deploy the application on production cloud services:
- **Database**: Railway PostgreSQL (Managed Service)
- **Backend API**: Railway (Web Service)
- **Frontend App**: Vercel (Static Site Host)

---

## 1. Database Setup (Railway PostgreSQL)

1. Log in to [railway.app](https://railway.app) and open your project.
2. Add a database service: Click **+ New** ➔ **Database** ➔ **Add PostgreSQL**.
3. Railway will provision a managed PostgreSQL instance and automatically generate the `DATABASE_URL` variable.
4. If linking to the backend service within the same project, set `DATABASE_URL` to `${{Postgres.DATABASE_URL}}`.

---

## 2. Backend Deployment (Railway)

1. In your Railway project, click **+ New** ➔ **GitHub Repo** and select your repository.
2. Set the Root Directory to `backend`.
3. Railway will auto-detect `backend/railway.json` and Nixpacks settings for build & deployment.
4. Set Environment Variables in Railway Backend Service:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}`
   - `JWT_ACCESS_SECRET`: `<Secure-Random-Key>`
   - `JWT_REFRESH_SECRET`: `<Secure-Random-Key>`
   - `CORS_ORIGIN`: `https://your-frontend-domain.vercel.app`
5. Generate a domain under Service Settings and note your service URL: `https://<your-railway-app>.up.railway.app`.

---

## 3. Frontend Deployment (Vercel)

1. Sign up at [vercel.com](https://vercel.com) and import your GitHub repository.
2. Select `frontend` as the Root Directory.
3. Vercel will auto-detect Vite. Build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Environment Variables:
   - `VITE_API_BASE_URL`: `https://<your-railway-app>.up.railway.app/api`
5. Click **Deploy**.

---

## 4. Docker Deployment (Alternative Self-Hosted)

To run the full stack locally or on a VPS using Docker Compose:

```bash
docker-compose up -d --build
```

Access services:
- **Frontend App**: `http://localhost`
- **Backend API**: `http://localhost:5000/api`
- **Swagger Docs**: `http://localhost:5000/api-docs`
