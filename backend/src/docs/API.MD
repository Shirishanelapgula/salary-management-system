# API Documentation

## Base URL

```
http://localhost:3000/api
```

---

# Response Format

All API responses follow a consistent structure.

## Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

# Employee APIs

## Get Employees

### Endpoint

```
GET /employees
```

### Query Parameters

| Parameter | Type | Description |
|------------|------|-------------|
| page | number | Current page |
| limit | number | Records per page |
| search | string | Search by employee name or email |
| department | string | Filter by department |
| country | string | Filter by country |
| designation | string | Filter by designation |

### Example

```
GET /employees?page=1&limit=20&department=Engineering
```

---

## Get Employee By ID

```
GET /employees/:id
```

### Example

```
GET /employees/10
```

---

## Create Employee

```
POST /employees
```

### Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "designation": "Software Engineer",
  "departmentId": 1,
  "countryId": 1
}
```

---

## Update Employee

```
PUT /employees/:id
```

---

## Delete Employee

```
DELETE /employees/:id
```

---

# Salary APIs

## Get Current Salary

```
GET /employees/:id/salary
```

---

## Salary History

```
GET /employees/:id/salary/history
```

---

## Revise Salary

```
POST /employees/:id/salary
```

### Request

```json
{
  "baseSalary": 1800000,
  "effectiveFrom": "2026-07-11"
}
```

### Business Rules

- Previous salary is marked inactive
- Effective end date is updated
- New salary becomes current
- Operation is executed within a database transaction

---

# Dashboard APIs

## Dashboard Summary

```
GET /dashboard/summary
```

Returns

- Total Employees
- Total Departments
- Total Countries
- Total Salary
- Average Salary

---

## Highest Paid Employees

```
GET /dashboard/highest-paid
```

---

## Lowest Paid Employees

```
GET /dashboard/lowest-paid
```

---

## Salary By Department

```
GET /dashboard/salary-by-department
```

---

## Country Statistics

```
GET /dashboard/country-stats
```

---

# AI APIs

## Execute AI Query

```
POST /ai/query
```

### Request

```json
{
  "query": "Show highest paid employees"
}
```

### Supported Queries

- Show highest paid employees
- Show lowest paid employees
- Show employees in India
- Show employees in Engineering
- Show average salary
- Show dashboard summary

### Example Response

```json
{
  "success": true,
  "message": "AI query executed successfully",
  "data": {
    "query": "Show highest paid employees",
    "parsedIntent": {
      "intent": "highest_paid"
    },
    "result": []
  }
}
```

---

# Validation

Input validation is implemented using **Zod**.

Validation occurs before business logic executes.

Common validations include:

- Required fields
- Email format
- Positive salary values
- Valid department and country IDs
- Query parameter validation

---

# Error Codes

| Status | Description |
|---------|-------------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Validation Error |
| 404 | Resource Not Found |
| 409 | Duplicate Resource |
| 500 | Internal Server Error |

---

# Pagination

Employee listing supports pagination.

Example

```
GET /employees?page=2&limit=25
```

Response includes:

```json
{
  "page": 2,
  "limit": 25,
  "total": 10000,
  "totalPages": 400,
  "data": []
}
```

---

# Filtering

Supported filters:

- Department
- Country
- Designation
- Search

Filters can be combined.

Example

```
GET /employees?page=1&department=Engineering&country=India
```

---

# Notes

- All endpoints return JSON.
- Business logic is implemented in the Service layer.
- Input validation is handled by Zod.
- Database operations use Prisma ORM.
- Salary revisions are transaction-safe to maintain historical accuracy.