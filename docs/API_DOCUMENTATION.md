# Enterprise Mini ERP + CRM API Specification

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://<your-railway-app>.up.railway.app/api`

---

## 1. Authentication Endpoints

### `POST /api/auth/login`
Authenticates user and returns access/refresh tokens.
- **Request Body**:
  ```json
  {
    "email": "admin@minierp.com",
    "password": "Admin123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "uuid",
        "email": "admin@minierp.com",
        "fullName": "Vikram Malhotra (Admin)",
        "role": "ADMIN"
      },
      "accessToken": "eyJhbGci...",
      "refreshToken": "eyJhbGci..."
    }
  }
  ```

### `POST /api/auth/refresh`
Issues new access token using valid refresh token.
- **Request Body**: `{ "refreshToken": "<refresh_token>" }`

### `POST /api/auth/logout`
Revokes refresh token.

---

## 2. Customer CRM Endpoints

### `GET /api/customers`
- **Query Params**: `page`, `limit`, `search`, `customerType`, `status`, `sortBy`, `sortOrder`
- **Response**: List of customers with pagination metadata.

### `POST /api/customers`
- **Required Roles**: `ADMIN`, `SALES`
- **Request Body**:
  ```json
  {
    "customerName": "Rajesh Shah",
    "businessName": "Apex Electronics Pvt Ltd",
    "email": "purchase@apexelectronics.com",
    "mobile": "+91 9820012345",
    "gstNumber": "27AAACA1234A1Z5",
    "customerType": "WHOLESALE",
    "address": "Industrial Hub, Mumbai"
  }
  ```

### `POST /api/customers/:id/followups`
Adds a CRM follow-up interaction note.

---

## 3. Product & Inventory Endpoints

### `GET /api/products`
- **Query Params**: `search`, `lowStock=true`

### `POST /api/inventory/adjust`
- **Required Roles**: `ADMIN`, `WAREHOUSE`
- **Request Body**:
  ```json
  {
    "productId": "uuid",
    "warehouseId": "uuid",
    "quantity": 25,
    "movementType": "IN",
    "reason": "Procurement shipment received"
  }
  ```

---

## 4. Sales Challans Endpoints

### `POST /api/challans`
- **Request Body**:
  ```json
  {
    "customerId": "uuid",
    "items": [
      {
        "productId": "uuid",
        "quantity": 5,
        "unitPrice": 3450.00
      }
    ],
    "notes": "Urgent warehouse dispatch"
  }
  ```

### `PATCH /api/challans/:id/status`
- **Request Body**: `{ "status": "CONFIRMED" }` (Status options: `DRAFT`, `CONFIRMED`, `CANCELLED`)
