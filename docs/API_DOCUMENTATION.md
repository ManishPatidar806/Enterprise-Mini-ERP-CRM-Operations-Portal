# API Documentation

This guide describes the HTTP API endpoints available in the Enterprise Mini ERP + CRM Portal.

## Base URLs
- **Local Development**: `http://localhost:5000/api`
- **Production (Render)**: `https://minierp-backend.onrender.com/api`
- **Swagger Interactive Docs**: `http://localhost:5000/api-docs`

---

## Authentication & Headers

Except for login and token refresh endpoints, all requests require an HTTP Authorization header containing a JWT access token:

```http
Authorization: Bearer <your_access_token>
```

Standard JSON response layout:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

---

## 1. Authentication Endpoints

### Login
- **Endpoint**: `POST /api/auth/login`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "admin@minierp.com",
    "password": "Admin123!"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "c1f7a08b-...",
        "email": "admin@minierp.com",
        "fullName": "Vikram Malhotra (Admin)",
        "role": "ADMIN"
      },
      "accessToken": "eyJhbG...",
      "refreshToken": "eyJhbG..."
    }
  }
  ```

### Refresh Token
- **Endpoint**: `POST /api/auth/refresh`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "refreshToken": "<your_refresh_token>"
  }
  ```
- **Response**: Returns a fresh `accessToken`.

### Logout
- **Endpoint**: `POST /api/auth/logout`
- **Auth Required**: No
- **Request Body**: `{ "refreshToken": "<your_refresh_token>" }`

---

## 2. Customer CRM Endpoints

### List Customers
- **Endpoint**: `GET /api/customers`
- **Query Parameters**:
  - `page` (default: 1)
  - `limit` (default: 10)
  - `search` (matches customer name, business name, GST number, or email)
  - `customerType` (`WHOLESALE` or `RETAIL`)

### Create Customer
- **Endpoint**: `POST /api/customers`
- **Roles Allowed**: `ADMIN`, `SALES`
- **Request Body**:
  ```json
  {
    "customerName": "Rajesh Shah",
    "businessName": "Apex Electronics Pvt Ltd",
    "email": "purchase@apexelectronics.com",
    "mobile": "+91 9820012345",
    "gstNumber": "27AAACA1234A1Z5",
    "customerType": "WHOLESALE",
    "address": "Industrial Estate, Mumbai"
  }
  ```

### Add Follow-Up Note
- **Endpoint**: `POST /api/customers/:id/followups`
- **Roles Allowed**: `ADMIN`, `SALES`
- **Request Body**:
  ```json
  {
    "notes": "Discussed bulk order discount for Q3.",
    "nextFollowupDate": "2026-08-01T10:00:00.000Z"
  }
  ```

---

## 3. Products & Stock Endpoints

### List Products
- **Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `search` (matches product name or SKU)
  - `lowStock` (`true` to filter products below minimum stock)

### Create Product
- **Endpoint**: `POST /api/products`
- **Roles Allowed**: `ADMIN`, `WAREHOUSE`
- **Request Body**:
  ```json
  {
    "name": "Industrial Router X500",
    "sku": "SKU-ROUT-500",
    "unitPrice": 4500.00,
    "minStock": 10,
    "unit": "PCS"
  }
  ```

### Manual Stock Adjustment
- **Endpoint**: `POST /api/inventory/adjust`
- **Roles Allowed**: `ADMIN`, `WAREHOUSE`
- **Request Body**:
  ```json
  {
    "productId": "<product_uuid>",
    "quantity": 25,
    "movementType": "IN",
    "reason": "New inventory stock arrival"
  }
  ```
  *(Set `movementType` to `"IN"` to add stock or `"OUT"` to deduct stock).*

---

## 4. Sales Challan Endpoints

### Create Sales Challan (Draft)
- **Endpoint**: `POST /api/challans`
- **Roles Allowed**: `ADMIN`, `SALES`
- **Request Body**:
  ```json
  {
    "customerId": "<customer_uuid>",
    "items": [
      {
        "productId": "<product_uuid>",
        "quantity": 5,
        "unitPrice": 4500.00
      }
    ],
    "notes": "Standard 30-day payment terms"
  }
  ```

### Update Challan Status (Confirm / Cancel)
- **Endpoint**: `PATCH /api/challans/:id/status`
- **Roles Allowed**: `ADMIN`, `SALES`, `WAREHOUSE`
- **Request Body**:
  ```json
  {
    "status": "CONFIRMED"
  }
  ```
  *When confirmed, the system verifies available stock and deducts items automatically. If stock is insufficient, the request returns an HTTP 400 error.*

---

## 5. Audit & Dashboard Endpoints

### Dashboard Summary
- **Endpoint**: `GET /api/dashboard/summary`
- **Roles Allowed**: All logged-in users
- **Response**: Total revenue, total customers, low stock count, pending challans, and monthly sales chart data.

### Audit Logs
- **Endpoint**: `GET /api/audit-logs`
- **Roles Allowed**: `ADMIN`, `ACCOUNTS`
- **Response**: List of user actions (created customer, updated stock, confirmed challan) with timestamps and IP addresses.
