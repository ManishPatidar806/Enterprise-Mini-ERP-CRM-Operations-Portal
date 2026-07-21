# Enterprise Mini ERP + CRM Portal

A web portal built for wholesale and distribution businesses to manage customers, track inventory, log follow-ups, and process sales challans.

Built with **Node.js, Express, Prisma ORM, React, TypeScript, Vite, Tailwind CSS, and PostgreSQL**.

---

## 🔑 Demo Login Accounts

You can test the app using these pre-configured accounts (or click the quick-login buttons on the login screen):

| Role | Email | Password | What You Can Do |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@minierp.com` | `Admin123!` | Access everything, view audit logs, delete records |
| **Sales Exec** | `sales@minierp.com` | `Sales123!` | Manage customer CRM, add follow-ups, create sales challans |
| **Warehouse Lead** | `warehouse@minierp.com` | `Warehouse123!` | Manage product list, adjust stock levels (`IN` / `OUT`) |
| **Accounts Manager** | `accounts@minierp.com` | `Accounts123!` | View financial summaries, print invoices, inspect audit logs |

---

## 🚀 Quick Start (Run Locally in 2 Minutes)

### Requirements
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Start the Backend API

```bash
cd backend
npm install
npm run prisma:db:push
npm run prisma:seed
npm run dev
```

The API will run at `http://localhost:5000/api`.  
You can also view interactive Swagger API docs at `http://localhost:5000/api-docs`.

### 2. Start the Frontend App

In a separate terminal window:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🐳 Run with Docker

To run the whole project (Database + Backend + Frontend) in one command:

```bash
docker-compose up -d --build
```

- **Frontend App**: `http://localhost`
- **Backend API**: `http://localhost:5000/api`
- **Swagger Docs**: `http://localhost:5000/api-docs`

---

## 🛠️ Tech Stack

### Backend
- **Node.js** & **TypeScript**
- **Express.js** (structured with Controllers, Services, and Middlewares)
- **Prisma ORM** (PostgreSQL for production, SQLite for local dev)
- **JWT & bcryptjs** (Authentication with access & refresh tokens)
- **Zod** (Input validation)
- **Winston & Morgan** (Logging)

### Frontend
- **React 18** & **TypeScript**
- **Vite** (Fast build tool)
- **TanStack Query** (React Query v5 for server state & caching)
- **Tailwind CSS** (Styling)
- **Recharts** (Dashboard analytics charts)
- **Lucide Icons** (UI icons)

---

## 📐 Project Structure

```
.
├── backend/
│   ├── prisma/                  # Database schemas (SQLite & PostgreSQL) & seed data
│   ├── src/
│   │   ├── controllers/         # Handles HTTP requests & responses
│   │   ├── services/            # Core business logic (stock calculations, sales rules)
│   │   ├── middlewares/         # JWT auth, role checks, error handling
│   │   ├── validations/         # Zod schemas for incoming requests
│   │   ├── routes/              # Express API route endpoints
│   │   └── index.ts             # Server entry point
│   ├── tests/                   # Jest API integration tests
│   └── swagger.json             # Swagger API documentation definition
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI parts (Layout, Navbar, Sidebar, Modals)
│   │   ├── context/             # Auth context (token & login state management)
│   │   ├── pages/               # Dashboard, Customers, Products, Inventory, Challans
│   │   └── lib/                 # Axios instance with auto-refresh token handling
├── render.yaml                  # 1-Click Render deployment configuration
└── docker-compose.yml           # Docker setup for full local stack
```

---

## 🔄 Core Business Workflows

1. **Customer Management**:
   - Create and edit customer profiles (Wholesale / Retail).
   - Built-in duplicate check for GST and Email.
   - Track follow-up notes with scheduled follow-up dates.

2. **Inventory Adjustments**:
   - Adjust product stock manually (`IN` for stock received, `OUT` for stock issued).
   - System flags items that drop below minimum stock threshold.

3. **Sales Challans & Automatic Stock Deduction**:
   - **Draft State**: Prepare challans without changing stock.
   - **Confirmation**: Stock is automatically checked and deducted from warehouse inventory. If stock is insufficient, the system blocks the order with a clear error.
   - **Invoice Generation**: Clean, printable sales challan / invoice layout.
   - **Cancellation**: Cancelling a confirmed challan restores the items back to warehouse stock.

---

## 🔌 API Overview

| Method | Endpoint | Description | Allowed Roles |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Login and receive tokens | Public |
| `POST` | `/api/auth/refresh` | Get a new access token | Public |
| `GET` | `/api/customers` | Search & list customers | All Roles |
| `POST` | `/api/customers` | Create new customer | Admin, Sales |
| `POST` | `/api/customers/:id/followups` | Log a CRM follow-up note | Admin, Sales |
| `GET` | `/api/products` | View product catalog & stock | All Roles |
| `POST` | `/api/inventory/adjust` | Record manual stock `IN` / `OUT` | Admin, Warehouse |
| `GET` | `/api/challans` | List sales challans | All Roles |
| `POST` | `/api/challans` | Create draft sales challan | Admin, Sales |
| `PATCH` | `/api/challans/:id/status` | Confirm or cancel challan | Admin, Sales, Warehouse |
| `GET` | `/api/audit-logs` | View audit trail | Admin, Accounts |

---

## ☁️ Deployment on Render

This project includes a pre-configured `render.yaml` for 1-click cloud deployment.

### 1-Click Render Blueprint
1. Push this project to your GitHub account.
2. Open [Render Dashboard](https://dashboard.render.com/) and click **New +** ➔ **Blueprint**.
3. Select your repository.
4. Render will automatically set up:
   - **PostgreSQL Database** (`minierp-postgres`)
   - **Backend Web Service** (`minierp-backend`)
   - **Frontend Static Site** (`minierp-frontend`)
5. Click **Apply** to deploy.

See [docs/DEPLOYMENT.md](file:///home/mohit/Pictures/Company%20Assignment/docs/DEPLOYMENT.md) for full step-by-step instructions.

---

## 🧪 Testing

To run the automated integration test suite:

```bash
cd backend
npm test
```

A manual QA testing checklist is also available in [docs/MANUAL_TESTING_CHECKLIST.md](file:///home/mohit/Pictures/Company%20Assignment/docs/MANUAL_TESTING_CHECKLIST.md).

---

## 📄 License

This project is open-source under the MIT License.
