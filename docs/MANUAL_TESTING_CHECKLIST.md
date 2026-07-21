# QA & Testing Checklist

Use this simple checklist to verify that all parts of the application are working properly.

---

## 1. Login & User Permissions

- [x] **Admin Account**: Log in with `admin@minierp.com` / `Admin123!`. Confirm access to all pages, user management, and audit logs.
- [x] **Sales Executive**: Log in with `sales@minierp.com` / `Sales123!`. Confirm access to Customers and Sales Challans.
- [x] **Warehouse Lead**: Log in with `warehouse@minierp.com` / `Warehouse123!`. Confirm access to Products and Stock Adjustments.
- [x] **Accounts Manager**: Log in with `accounts@minierp.com` / `Accounts123!`. Confirm access to Financial Summaries and Audit Logs.
- [x] **Protected Routes**: Try opening `/dashboard` directly while logged out. Confirm it redirects to `/login`.
- [x] **Token Refresh**: Stay logged in until the access token expires. Confirm the app refreshes the token without logging you out.

---

## 2. Customer CRM Module

- [x] **Add Customer**: Fill out the customer form. Enter an existing GST number or Email and confirm duplicate validation works.
- [x] **Search & Filter**: Search customers by business name. Filter by Wholesale vs Retail.
- [x] **Follow-Up Notes**: Add a follow-up note to a customer and verify the scheduled date updates on the timeline.
- [x] **Delete Customer**: Delete a customer record and verify it is hidden from active customer lists.

---

## 3. Products & Stock Module

- [x] **Low Stock Warning**: Check if products with stock at or below the minimum stock level display a red warning badge.
- [x] **Stock In**: Perform a manual stock adjustment to add items (`IN`) and verify stock count increases.
- [x] **Stock Out Validation**: Try to deduct more stock than is available. Confirm the system blocks the request with a clear message.

---

## 4. Sales Challans & Invoices

- [x] **Draft Challan**: Create a sales challan with multiple items. Verify stock levels do not change while in `DRAFT` status.
- [x] **Confirm Order**: Confirm the challan. Verify stock is automatically deducted from inventory.
- [x] **Out of Stock Block**: Try to confirm a challan when item quantity exceeds available stock. Confirm the system prevents confirmation.
- [x] **Print Invoice**: Click Print/Export PDF on a confirmed challan. Verify the printable invoice loads with correct details.
