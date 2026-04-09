# Elasto Marketing Corp. - Sales and Operations Management System
## Master Prompt / Product Requirements Document (PRD)

**Project Goal:** 
Develop a complete, full-stack web application for Elasto Marketing Corp. to digitize and integrate their sales, inventory, and logistics operations. The system must eliminate manual bottlenecks, prevent order fulfillment failures, stop revenue leakage, and provide actionable analytics for the owners.

**Tech Stack Requirements:**
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Lucide React (Icons), Motion (Animations).
- **Backend:** Node.js, Express (Full-stack setup running on port 3000).
- **Database/Auth:** Firebase (Firestore & Firebase Auth) or PostgreSQL (depending on final implementation choice).

---

## 🏢 Organizational Context & Roles
The system must support Role-Based Access Control (RBAC) tailored to the company's structure:
1. **Owners (Admin):** Full access to all modules, specifically Sales & Analytics Reporting.
2. **Sales Representative (Alvin N. Go):** Access to CRM, Order Management, and Inventory visibility.
3. **Order Taker / Customer Service:** Access to CRM, Order Management, and Inventory visibility.
4. **Cashier / Bookkeeper:** Access to Accounts Receivable & Billing, and Order Management.
5. **Warehouse Staff:** Access to Inventory Management (updates, stock checks).
6. **Logistics Team (Drivers/Helpers):** Access to Delivery & Logistics (viewing routes, confirming deliveries).

---

## 🧩 Core Subsystems to Implement

### 1. Inventory Management Subsystem
*Addresses inventory volatility and stock visibility issues.*
- **Features:**
  - Real-time stock tracking for all SKUs (styrofoam containers, cups, plastics).
  - Stock movement logging (Incoming shipments, Outgoing orders, Manual adjustments/spoilage).
  - Low-stock threshold alerts (visual indicators and notifications).
- **Data Entities:** `Product` (SKU, Name, Category, Price, CurrentStock, ReorderLevel), `InventoryLog` (ProductID, ChangeAmount, Type, Timestamp, UserID).

### 2. Order Management Subsystem
*Addresses order fulfillment failures.*
- **Features:**
  - Order creation interface (Client selection, Product selection, Quantity, Pricing).
  - Order status tracking (`Pending`, `Processing`, `Out for Delivery`, `Delivered`, `Cancelled`).
  - Assignment of orders to the Logistics team.
  - Flagging system for delayed or undelivered orders.
- **Data Entities:** `Order` (OrderID, ClientID, Status, TotalAmount, CreatedAt, AssignedDriverID), `OrderItem` (OrderID, ProductID, Quantity, UnitPrice).

### 3. Accounts Receivable & Billing Subsystem
*Addresses revenue leakage and untracked debts.*
- **Features:**
  - Invoice generation linked to completed orders.
  - Payment tracking (Partial payments, Full payments, Overdue flagging).
  - Client statement of account generation.
  - Dashboard for cashier to see "Total Outstanding Debt" and "Payments Due Today".
- **Data Entities:** `Invoice` (InvoiceID, OrderID, ClientID, TotalAmount, AmountPaid, Status, DueDate), `Payment` (InvoiceID, Amount, PaymentMethod, Timestamp).

### 4. Delivery & Logistics Subsystem
*Supports the operations and logistics team.*
- **Features:**
  - Delivery scheduling and route grouping (e.g., Fish ports, Wet markets, Gaisano Stores).
  - Driver assignment to specific orders/routes.
  - Delivery confirmation logging (Proof of delivery, timestamp, receiver name).
- **Data Entities:** `Delivery` (DeliveryID, OrderID, DriverID, Status, ScheduledDate, CompletedAt, Notes).

### 5. Sales & Analytics Reporting Subsystem
*Addresses the administrative drain and lack of strategic data.*
- **Features:**
  - Dashboard with KPIs: Total Revenue, Outstanding Receivables, Total Orders.
  - Top-selling products chart (Volume and Revenue).
  - Customer order frequency analysis (identifying churn or top clients).
  - Exportable reports (CSV/PDF) for specific date ranges.
- **Data Entities:** Aggregates data from `Order`, `Invoice`, and `Product` collections.

### 6. Customer Relationship Management (CRM) Subsystem
*Supports Sales Reps and Order Takers.*
- **Features:**
  - Centralized client database (Name, Contact Info, Address, Client Type: Retail/Wholesale/Corporate).
  - Order history view per client.
  - Communication/Interaction logs (e.g., "Called on Tuesday, requested new pricing for cups").
- **Data Entities:** `Client` (ClientID, Name, Type, ContactPerson, Phone, Address, CreditLimit), `InteractionLog` (ClientID, UserID, Notes, Timestamp).

---

## 🚀 Implementation Instructions for the AI
When executing this master prompt, follow these steps iteratively:
1. **Database Setup:** Initialize the database schema (Firebase Blueprint or SQL schema) based on the Data Entities listed above.
2. **Authentication:** Implement RBAC login.
3. **UI Shell:** Create a responsive sidebar navigation layout linking to the 6 subsystems.
4. **Iterative Build:** Build each subsystem one by one, starting with **Inventory** and **CRM** (as they are foundational for Orders), followed by **Orders**, **Logistics**, **Billing**, and finally **Reporting**.
5. **Design System:** Use Tailwind CSS with a clean, professional, enterprise SaaS aesthetic (e.g., Shadcn UI patterns, Inter font, clear data tables, and status badges).
