# Salary Management System

## Goal

Build a web-based Salary Management System that enables HR Managers to efficiently manage salary information for 10,000 employees across multiple countries. The application should replace spreadsheet-based workflows with a scalable, searchable, and maintainable solution.

---

## Problem Statement

The HR team currently manages employee salary information using Excel spreadsheets, making it difficult to:

- Maintain accurate salary records
- Search employee information quickly
- Generate salary insights
- Analyze payroll across countries and departments
- Answer business questions efficiently

---

## Target User

Primary User:

- HR Manager

---

## Functional Requirements

### Employee Management

- Add Employee
- Edit Employee
- Delete Employee
- View Employee
- Search Employee
- Paginated Employee List

### Salary Management

- Assign Salary
- Update Salary
- View Salary Details
- Maintain Salary History

### Dashboard

- Total Employees
- Total Payroll
- Average Salary
- Highest Salary
- Country-wise Employee Count

### AI Assistant

Allow HR to ask questions in natural language such as:

- What is the average salary?
- Who earns the highest salary?
- Show employees earning above ₹20 LPA.
- Which department has the highest payroll?

---

## Non Functional Requirements

- Support 10,000 employees
- Responsive UI
- Fast search
- Maintainable architecture
- Unit tested
- Type-safe
- Modular codebase

---

## Out of Scope

- Authentication
- Authorization
- Payroll processing
- Tax calculations
- Email notifications
- Multi-user collaboration

---

## Technology Stack

Frontend:
- React
- TypeScript

Backend:
- Node.js
- Express
- TypeScript

Database:
- SQLite

Testing:
- Vitest / Jest

---

## Success Criteria

The application should:

- Manage 10,000 employees smoothly
- Provide a clean HR experience
- Enable AI-powered salary queries
- Demonstrate production-quality engineering practices