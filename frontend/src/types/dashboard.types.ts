export interface DashboardSummary {
  totalEmployees: number;
  totalDepartments: number;
  totalCountries: number;
  totalSalary: number;
  averageSalary: number;
}

export interface DepartmentSalary {
  department: string;
  totalSalary: number;
}

export interface CountryStat {
  country: string;
  employees: number;
}