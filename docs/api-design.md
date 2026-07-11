# API Design

## Employee APIs

### Get Employees

GET /api/employees

Query Parameters

page=1

limit=20

search=john

department=Engineering

country=India

designation=Manager

sort=firstName

order=asc

---

### Get Employee

GET /api/employees/:id

---

### Create Employee

POST /api/employees

---

### Update Employee

PUT /api/employees/:id

---

### Delete Employee

DELETE /api/employees/:id

---

## Dashboard APIs

GET /api/dashboard

---

## Salary APIs

GET /api/salaries

POST /api/salaries

PUT /api/salaries/:id

---

## AI APIs

POST /api/ai/query