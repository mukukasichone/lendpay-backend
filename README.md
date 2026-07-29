# 🚀 LendPay Backend API

A production-style Loan Management System backend built with **Node.js**, **TypeScript**, **Express**, **Prisma ORM**, and **PostgreSQL**.

This project manages the complete lending lifecycle from customer onboarding through loan repayment while implementing authentication, authorization, audit logging, reporting, and dashboard analytics.

---

# Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- User Management
- Customer Management
- Loan Product Management
- Guarantor Management
- Loan Applications
- Credit Assessment
- Loan Approval Workflow
- Loan Disbursement
- Loan Management
- Loan Repayment Processing
- Repayment Allocation
- Collection Activities
- Penalty Management
- Overdue Loan Monitoring
- Write-Off Management
- Loan Transaction History
- Notifications
- Audit Logs
- Dashboard Summary
- Reporting

---

# Technology Stack

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation

---

# Project Structure

```
src
│
├── common
├── config
├── middleware
├── modules
│   ├── auth
│   ├── user
│   ├── customer
│   ├── guarantor
│   ├── loanProduct
│   ├── loanApplication
│   ├── creditAssessment
│   ├── approval
│   ├── disbursement
│   ├── loan
│   ├── repayment
│   ├── collectionActivity
│   ├── overdue
│   ├── penalty
│   ├── writeOff
│   ├── loanTransaction
│   ├── notification
│   ├── dashboard
│   ├── reports
│   └── auditLog
│
├── utils
├── app.ts
└── server.ts
```

---

# Architecture

```
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Prisma ORM
   ↓
PostgreSQL
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/mukukasichone/lendpay-backend.git
```

Navigate into the project

```bash
cd lendpay-backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/lendpay"
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=5000
```

---

# Database

Run Prisma migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

(Optional)

Seed database

```bash
npx prisma db seed
```

---

# Running the Application

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

---

# Authentication

The API uses JWT Bearer Authentication.

Example:

```
Authorization: Bearer <access_token>
```

---

# API Modules

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| Users | ✅ |
| Customers | ✅ |
| Guarantors | ✅ |
| Loan Products | ✅ |
| Loan Applications | ✅ |
| Credit Assessment | ✅ |
| Loan Approval | ✅ |
| Disbursement | ✅ |
| Loans | ✅ |
| Repayments | ✅ |
| Collections | ✅ |
| Overdue | ✅ |
| Penalties | ✅ |
| Write-Offs | ✅ |
| Loan Transactions | ✅ |
| Notifications | ✅ |
| Dashboard | ✅ |
| Reports | ✅ |
| Audit Logs | ✅ |

---

# Security

- JWT Authentication
- Password Hashing
- Role-Based Authorization
- Request Validation
- Centralized Error Handling
- Audit Logging

---

# Future Improvements

- Email Notifications
- SMS Integration
- File Uploads
- Refresh Tokens
- API Documentation (Swagger)
- Docker Support
- Unit & Integration Testing
- CI/CD Pipeline

---

# Author

**Rogers Sichone**

Treasury & Financial Markets Professional

Manager – FX & Money Markets

Master's Student in Data Analytics

GitHub:

https://github.com/mukukasichone

---

# License

This project is for educational and portfolio purposes.
