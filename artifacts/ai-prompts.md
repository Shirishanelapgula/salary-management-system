# AI Usage Report

This project was developed with AI assistance as part of an AI-assisted engineering workflow.

## AI Tools Used

- ChatGPT (Primary)
- Gemini (Used for experimentation during AI module development but later discarded)

---

## Development Workflow

The project was developed incrementally using AI assistance while all architectural decisions, testing, debugging and integration were performed manually.

Major prompts used during development included:

### Project Setup

- Generate a scalable Node.js + TypeScript + Express backend architecture.
- Generate a React + TypeScript frontend with React Query and Tailwind CSS.
- Configure Prisma ORM with SQLite.
- Create project folder structure following Controller-Service-Repository architecture.

---

### Database Design

- Design Prisma schema for:
  - Users
  - Employees
  - Departments
  - Countries
  - Salaries
  - Audit Logs

- Generate Prisma migrations and seed script for 10,000 employees using Faker.

---

### Backend APIs

Generate CRUD modules for:

- Employees
- Departments
- Countries
- Salaries

including:

- Repository
- Service
- Controller
- Routes
- Validation
- Types

---

### Authentication

Generate:

- JWT Authentication
- Login API
- Password validation
- Protected Routes
- Authentication middleware
- React Authentication Context

---

### Dashboard

Generate APIs for:

- Employee Count
- Department Count
- Country Count
- Average Salary
- Total Payroll
- Highest Paid Employees
- Lowest Paid Employees

---

### Audit Logs

Generate:

- AuditLog Prisma model
- Repository
- Service
- Controller
- Route
- Automatic logging after Create, Update and Delete operations.

---

### AI Assistant

Generate a rule-based AI assistant capable of answering:

- Employee count
- Department count
- Country count
- Average salary
- Total payroll
- Highest paid employees
- Lowest paid employees
- Employees grouped by country
- Employees grouped by department
- Employees from a specific country
- Department salary report
- Recently joined employees

---

### Frontend

Generate:

- Authentication screens
- Dashboard
- Employee Management
- Department Management
- Country Management
- Salary Management
- Audit Log page
- AI Chat page

---

### Improvements

Used AI assistance for:

- Toast notifications
- Form validation
- Error handling
- Protected routing
- Code refactoring
- Repository Pattern improvements
- Responsive UI improvements
- TypeScript fixes
- Prisma fixes
- Build optimization

---

## Manual Work Performed

Although AI assisted with code generation, the following were completed manually:

- Architecture decisions
- Folder organization
- Module integration
- Prisma debugging
- Authentication fixes
- Route protection
- React Query integration
- Axios interceptor debugging
- AI query integration
- Audit Log integration
- Testing
- Bug fixing
- UI polishing
- Final production build