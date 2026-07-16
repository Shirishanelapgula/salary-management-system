# 💼 Salary Management System

A modern Full Stack Salary Management System built using **React, TypeScript, Node.js, Express, Prisma ORM, and SQLite**.

The application enables HR teams to manage employees, departments, countries, salaries, audit logs, and interact with an AI-powered assistant to retrieve organizational insights using natural language.

---

# 🚀 Features

## Authentication
- Secure JWT Authentication
- Role-based access support
- Protected Routes
- Persistent Login
- Logout

---

## Dashboard

- Total Employees
- Total Departments
- Total Countries
- Average Salary
- Total Payroll
- Highest Paid Employees
- Lowest Paid Employees

---

## Employee Management

- View Employees
- Search Employees
- Filter by Department
- Filter by Country
- Add Employee
- Edit Employee
- Delete Employee
- Employee Profile
- Salary History

---

## Department Management

- Create Department
- Update Department
- Delete Department
- Department Statistics

---

## Country Management

- Create Country
- Update Country
- Delete Country
- Currency Management

---

## Salary Management

- Current Salary
- Salary History
- Salary Updates
- Automatic Previous Salary Tracking

---

## Audit Logs

Every important action is automatically tracked.

Examples:

- Employee Created
- Employee Updated
- Employee Deleted

Each log stores:

- Action
- Entity
- Description
- User
- Timestamp

---

## AI Assistant

A built-in AI assistant allows users to ask business questions in natural language.

### Supported Queries

- How many employees do we have?
- Average salary
- Total payroll
- Highest paid employees
- Lowest paid employees
- Employees by department
- Employees by country
- Employees from India
- Department salary report
- Recently joined employees

---

# 🏗 Architecture

```
Frontend (React + TypeScript)
        │
        │ REST APIs
        ▼
Backend (Node + Express)
        │
Business Services
        │
Repositories
        │
Prisma ORM
        │
SQLite Database
```

The backend follows a layered architecture:

```
Controller
      ↓
Service
      ↓
Repository
      ↓
Prisma ORM
      ↓
SQLite
```

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- React Router
- React Query
- Axios
- Tailwind CSS
- React Hot Toast

---

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- JWT Authentication
- Zod Validation
- Morgan
- Helmet

---

# 📂 Project Structure

```
salary_management_system
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── ai
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   ├── utils
│   │   └── validations
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   └── types
│
└── README.md
```

---

# ⚙ Backend Setup

```bash
cd backend

npm install
```

Create

```
.env
```

```
DATABASE_URL="file:./dev.db"

JWT_SECRET=your_secret_key

PORT=3000
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Seed Database

```bash
npm run seed
```

Run Server

```bash
npm run dev
```

---

# ⚙ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

Backend runs on

```
http://localhost:3000
```

---

# 🔑 Demo Credentials

Administrator

```
Email:
employee1@company.com

Password:
password123
```

> Credentials are generated during the seed process.

---

# 📡 API Modules

## Authentication

```
POST /api/auth/login
```

---

## Dashboard

```
GET /api/dashboard
```

---

## Employees

```
GET /api/employees

GET /api/employees/:id

POST /api/employees

PUT /api/employees/:id

DELETE /api/employees/:id
```

---

## Departments

```
GET /api/departments

POST /api/departments

PUT /api/departments/:id

DELETE /api/departments/:id
```

---

## Countries

```
GET /api/countries

POST /api/countries

PUT /api/countries/:id

DELETE /api/countries/:id
```

---

## Salaries

```
GET /api/salaries

PUT /api/salaries/:id
```

---

## Audit Logs

```
GET /api/audit
```

---

## AI Assistant

```
POST /api/ai
```

Example

```json
{
  "query": "highest paid employees"
}
```

---

# 📊 Database

SQLite Database managed using Prisma ORM.

Main Entities

- User
- Employee
- Department
- Country
- Salary
- AuditLog

---

# ✅ Validation

Backend request validation is implemented using **Zod**.

Features include:

- Request validation
- Input sanitization
- Error handling
- Type-safe APIs

---

# 🔒 Security

- JWT Authentication
- Password Verification
- Protected Routes
- Helmet
- CORS
- Input Validation

---

# 🎯 Highlights

- Full TypeScript
- Layered Architecture
- Repository Pattern
- Prisma ORM
- AI Query Engine
- Audit Logging
- Responsive UI
- Toast Notifications
- Search & Filtering
- Salary History Tracking

---

# 📸 Screenshots

_Add application screenshots here._

- Login
- Dashboard
- Employees
- Salary Management
- Audit Logs
- AI Assistant

---

# 🚀 Future Improvements

- OpenAI / Gemini Integration
- Charts & Analytics
- Excel Export
- PDF Reports
- Email Notifications
- Role-Based Permissions
- Dark Mode
- Pagination & Virtual Scrolling

---

# 👨‍💻 Developed By

**Shirisha Nelapogula**

Built as part of the **Incubyte Software Craftsperson (Node.js / TypeScript / React.js) Engineering Assessment**.
