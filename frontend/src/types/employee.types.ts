export interface Employee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;

  department: {
    id: number;
    name: string;
  };

  country: {
    id: number;
    name: string;
    currency: string;
  };

  salary?: {
    id: number;
    baseSalary: number;
    currency: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface EmployeeResponse {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
}

export interface EmployeeQuery {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  country?: string;
}