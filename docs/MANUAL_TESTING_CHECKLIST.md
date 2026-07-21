# Manual Testing & QA Verification Checklist

Use this checklist to perform complete QA validation on the application.

## 1. Authentication & Role Authorization

- [x] **Admin Login**: Test `admin@minierp.com` / `Admin123!`. Access full system.
- [x] **Sales Login**: Test `sales@minierp.com` / `Sales123!`. Access CRM & Challans.
- [x] **Warehouse Lead**: Test `warehouse@minierp.com` / `Warehouse123!`. Access Stock Adjustments.
- [x] **Accounts Manager**: Test `accounts@minierp.com` / `Accounts123!`. Access Audit Logs & Financials.
- [x] **Unauthenticated Access**: Direct route navigation to `/dashboard` redirects to `/login`.
- [x] **Token Refresh**: Automatic seamless token refresh when access token expires.

## 2. Customer CRM Module

- [x] **Customer Creation**: Fill form with duplicate GST/Email; verify validation prevents duplicates.
- [x] **Search & Filter**: Search by business name, filter by Wholesale / Retail.
- [x] **CRM Follow-up**: Add follow-up note and verify scheduled date updates on timeline.
- [x] **Soft Delete**: Deleting a customer marks record as `isDeleted = true`.

## 3. Product & Inventory Module

- [x] **Low Stock Indicator**: Products with stock <= minStock highlight with red warning badge.
- [x] **Stock Adjustment (IN)**: Add stock quantity; verify stock movement log records `IN`.
- [x] **Stock Adjustment (OUT)**: Deduct stock; verify system blocks deduction if stock < requested.

## 4. Sales Challan Workflow

- [x] **Create Draft Challan**: Create Challan with multiple items; verify stock is NOT deducted in DRAFT status.
- [x] **Confirm Challan**: Click Confirm; verify stock is deducted and OUT movement is logged.
- [x] **Negative Stock Block**: Attempting to confirm a challan exceeding available stock throws clear error.
- [x] **Printable Invoice**: Click Print/Export PDF; verify printable document formats properly.
