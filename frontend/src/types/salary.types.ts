export interface Salary {
  id: number;
  employeeId: number;

  employee: {
    id: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    department: {
      id: number;
      name: string;
    };
    country: {
      id: number;
      name: string;
    };
  };

  baseSalary: number;
  currency: string;

  effectiveFrom: string;
  effectiveTo?: string;

  isCurrent: boolean;

  createdAt: string;
}

export interface SalaryQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface SalaryFormData {
  employeeId: number;
  baseSalary: number;
  effectiveFrom: string;
}