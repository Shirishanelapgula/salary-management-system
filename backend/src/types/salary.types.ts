export interface SalaryRevisionRequest {
  baseSalary: number;
  effectiveFrom?: Date;
}

export interface SalaryHistoryQuery {
  employeeId: number;
}

export interface CurrentSalaryResponse {
  employeeId: number;
  employeeName: string;
  baseSalary: number;
  currency: string;
  effectiveFrom: Date;
}