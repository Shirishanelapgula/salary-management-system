# 💰 Salary Management System

An AI-assisted, production-inspired Salary Management System built as part of the **Incubyte Software Craftsperson Engineering Assessment**.

The application manages **10,000+ employee salary records**, provides analytics dashboards, maintains complete salary revision history, and supports natural language queries through an AI-powered query engine.

---

# 🚀 Features

## Employee Management
- Create Employee
- Update Employee
- Delete Employee
- View Employee Details
- Search Employees
- Pagination
- Department Filtering
- Country Filtering
- Designation Filtering

## Salary Management
- View Current Salary
- View Salary History
- Salary Revision
- Automatic Salary Versioning
- Current Salary Tracking

## Dashboard Analytics
- Total Employees
- Total Departments
- Total Countries
- Total Salary Cost
- Average Salary
- Highest Paid Employees
- Lowest Paid Employees
- Salary by Department
- Country Statistics

## AI Query Engine
Supports Natural Language Queries such as:

- Show highest paid employees
- Show lowest paid employees
- Show employees in India
- Show Engineering employees
- Show salary summary
- Show average salary

The AI module is designed using a provider abstraction, making it easy to integrate OpenAI or Claude in the future.

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js 5
- TypeScript
- Prisma ORM
- SQLite
- Zod Validation

## Testing

- Vitest
- Supertest

## Development Tools

- Faker.js
- TSX
- ESLint
- Prettier

---

# 📁 Project Structure

```
backend
│
├── docs
├── prisma
├── src
│   ├── ai
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── middleware
│   ├── repositories
│   ├── routes
│   ├── seed
│   ├── services
│   ├── tests
│   ├── types
│   ├── utils
│   └── validations
│
├── package.json
└── README.md
```

---

# 🏗 Architecture

The project follows a layered architecture.

```
                REST API

                    │

               Express Routes

                    │

               Controllers

                    │

                Services

                    │

              Prisma ORM

                    │

               SQLite Database
```

Business logic is isolated inside the Service layer while controllers remain thin and responsible only for request handling.

---

# 🗄 Database Design

The application consists of four main entities.

```
Department
     │
     │
Employee
     │
     │
Salary

Country
```

### Employee

Stores employee profile information.

### Department

Represents employee departments.

### Country

Stores employee location and currency.

### Salary

Maintains complete salary history.

Only one salary record is marked as **Current** at any time.

---

# 🤖 AI Query Engine

The AI module converts natural language into structured application queries.

Architecture

```
User Query

      │

      ▼

Intent Parser

      ▼

AI Provider

      ▼

Query Executor

      ▼

Employee Service
Dashboard Service

      ▼

Prisma ORM

      ▼

SQLite
```

Current implementation uses a Rule-Based Provider.

Future implementations can replace it with:

- OpenAI
- Claude
- Gemini
- Azure OpenAI

without changing the rest of the application.

---

# 📚 API Modules

## Employee APIs

- GET /employees
- GET /employees/:id
- POST /employees
- PUT /employees/:id
- DELETE /employees/:id

---

## Salary APIs

- GET /employees/:id/salary
- GET /employees/:id/salary/history
- POST /employees/:id/salary

---

## Dashboard APIs

- GET /dashboard/summary
- GET /dashboard/highest-paid
- GET /dashboard/lowest-paid
- GET /dashboard/salary-by-department
- GET /dashboard/country-stats

---

## AI APIs

- POST /ai/query

Example Request

```json
{
  "query": "show highest paid employees"
}
```

---

# ⚙ Getting Started

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```
DATABASE_URL="file:./dev.db"
```

---

## Run Database Migration

```bash
npx prisma migrate dev
```

---

## Seed Database

```bash
npm run seed
```

---

## Start Application

```bash
npm run dev
```

---

# 🧪 Running Tests

```bash
npm run test
```

---

# 🎯 Design Decisions

### Why Prisma?

- Type-safe ORM
- Excellent TypeScript support
- Migration support
- Improved developer productivity

---

### Why SQLite?

- Lightweight
- Easy setup
- Perfect for assessment projects
- No external database required

---

### Why Salary History?

Salary revisions should never overwrite previous records.

The application preserves complete salary history while ensuring only one record is marked as current.

---

### Why Service Layer?

Business logic remains independent from HTTP controllers.

This improves maintainability, testing, and code organization.

---

### Why AI Provider Abstraction?

The provider abstraction allows future AI integrations without changing application logic.

Only the provider implementation changes.

---

# 📈 Scalability Considerations

Current implementation supports over **10,000 employee records**.

For production-scale deployments (1M+ employees), the following improvements are recommended:

- PostgreSQL
- Redis Cache
- ElasticSearch
- Horizontal Scaling
- Read Replicas
- Background Jobs
- Message Queues
- CDN for static assets

---

# 🔮 Future Enhancements

- Authentication & Authorization
- Role-Based Access Control
- OpenAI Integration
- Claude Integration
- AI Chat Assistant
- Salary Forecasting
- Payroll Management
- Export Reports (Excel/PDF)
- Email Notifications
- Docker Deployment
- Kubernetes Deployment

---

# 👨‍💻 AI Assisted Development

This project was developed using an AI-assisted engineering workflow.

AI was used to:

- Brainstorm architecture
- Refine system design
- Generate boilerplate code
- Review implementation
- Improve documentation
- Validate engineering decisions

All generated code was reviewed, integrated, and adapted manually to fit the project requirements.

---

# 👨‍💻 Author

**Shirisha Nelapogula**

Software Engineer

Built as part of the **Incubyte Software Craftsperson Assessment**.