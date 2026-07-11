export interface Department {
  id: number;
  name: string;
}


export interface Country {
  id: number;
  name: string;
  currency: string;
}


export interface Employee {
  id: number;

  employeeId: string;

  firstName: string;

  lastName: string;

  email: string;

  designation: string;

  department: Department;

  country: Country;

  createdAt: string;

  updatedAt: string;
}


export interface EmployeeResponse {
  data: Employee[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}


export interface EmployeePayload {

  firstName: string;

  lastName: string;

  email: string;

  designation: string;

  departmentId: number;

  countryId: number;
}