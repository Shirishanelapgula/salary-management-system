export interface SalaryHistory {
  id: number;
  baseSalary: number;
  currency: string;
  effectiveFrom: string;
  effectiveTo: string | null;
  isCurrent: boolean;
}

export interface EmployeeProfile {
  employee: {
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
  };

  currentSalary: SalaryHistory | null;

  salaryHistory: SalaryHistory[];
}