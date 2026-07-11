# Database Design

## Overview

The Salary Management System is designed to support 10,000 employees with efficient querying, maintainability, and scalability.

---

## Tables

### Employee Table

| Field | Type |
|--------|------|
| id | Integer |
| employeeId | String |
| firstName | String |
| lastName | String |
| email | String |
| designation | String |
| departmentId | Integer |
| countryId | Integer |
| createdAt | DateTime |
| updatedAt | DateTime |

---

### Department Table

| Field | Type |
|--------|------|
| id | Integer |
| name | String |

---

### Country

| Field | Type |
|--------|------|
| id | Integer |
| name | String |
| currency | String |

---

### Salary

| Field | Type |
|--------|------|
| id | Integer |
| employeeId | Integer |
| baseSalary | Decimal |
| currency | String |
| effectiveFrom | Date |
| effectiveTo | Date |
| isCurrent | Boolean |
| createdAt | DateTime |

---

## Relationships

- One Department → Many Employees
- One Country → Many Employees
- One Employee → Many Salary Records

---

## Why This Design?

- Supports salary history.
- Avoids duplicate department and country data.
- Makes reporting and analytics easier.
- Easily scalable for future enhancements.