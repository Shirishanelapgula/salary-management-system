# System Architecture

## Overview

The Salary Management System follows a layered architecture that separates concerns into well-defined components. Each layer has a single responsibility, improving maintainability, scalability, and testability.

```
                 Client
                    │
                    ▼
            Express Routes
                    │
                    ▼
              Controllers
                    │
                    ▼
               Services
                    │
                    ▼
         AI Query Executor (AI Module)
                    │
                    ▼
              Prisma ORM
                    │
                    ▼
             SQLite Database
```

---

# Layer Responsibilities

## Routes

Routes define the public API of the application.

Responsibilities:

- URL mapping
- HTTP methods
- Delegating requests to controllers

Routes contain no business logic.

---

## Controllers

Controllers act as the entry point into the application.

Responsibilities:

- Receive HTTP requests
- Validate incoming data
- Call service methods
- Return standardized API responses
- Forward errors to middleware

Controllers intentionally remain thin.

---

## Services

Services contain all business logic.

Examples include:

- Employee Management
- Salary Revision
- Dashboard Analytics
- AI Query Processing

Keeping business logic inside services allows controllers to remain simple and improves testability.

---

## AI Layer

The AI module converts natural language into executable application queries.

Workflow:

```
User Query
     │
     ▼
Intent Parser
     │
     ▼
AI Provider
     │
     ▼
Query Executor
     │
     ▼
Business Services
     │
     ▼
Prisma ORM
```

The AI module is provider-based, allowing future integration with OpenAI, Claude, or Azure OpenAI without changing application logic.

---

## Prisma ORM

Prisma provides:

- Type-safe database access
- Query generation
- Migrations
- Relationship management
- Transaction support

Using Prisma significantly reduces boilerplate code and improves developer productivity.

---

## Database

SQLite is used for this assessment because it:

- Requires no installation
- Is lightweight
- Is sufficient for 10,000+ records
- Simplifies project setup

For production deployments, PostgreSQL is recommended.

---

# Request Lifecycle

A typical request follows this flow:

```
Client

   │

   ▼

Express Route

   ▼

Controller

   ▼

Validation (Zod)

   ▼

Service

   ▼

Prisma

   ▼

SQLite

   ▼

Response Formatter

   ▼

Client
```

---

# Error Handling

The application uses centralized error handling.

Benefits:

- Consistent API responses
- Reduced duplication
- Easier debugging
- Better maintainability

---

# Validation Strategy

Input validation is performed using Zod.

Validation occurs before business logic executes.

Benefits:

- Strong type safety
- Cleaner services
- Better error messages

---

# Architectural Decisions

## Layered Architecture

Chosen because it:

- Separates concerns
- Improves readability
- Simplifies testing
- Supports future scaling

---

## AI Provider Pattern

A provider abstraction was introduced so that the AI implementation can evolve independently.

Current:

```
RuleBasedProvider
```

Future:

```
OpenAIProvider

ClaudeProvider

GeminiProvider

AzureOpenAIProvider
```

No business logic changes are required when replacing providers.

---

# Scalability

The current architecture comfortably supports over 10,000 employee records.

For larger deployments:

- PostgreSQL
- Redis
- ElasticSearch
- Background Workers
- Read Replicas
- Horizontal Scaling

can be introduced without major architectural changes.

---

# Summary

The system is designed to prioritize:

- Maintainability
- Extensibility
- Testability
- AI Integration
- Clear separation of concerns

The architecture intentionally keeps controllers lightweight while centralizing business logic inside services, making the application easier to extend and maintain.