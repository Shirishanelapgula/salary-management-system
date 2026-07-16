export interface ParsedIntent {
  intent:
    | "highest_paid"
    | "lowest_paid"
    | "total_payroll"
    | "employee_count"
    | "department_count"
    | "country_count"
    | "average_salary"
    | "employees_by_department"
    | "employees_by_country"
    | "employees_by_country_name"
    | "department_salary_report"
    | "recent_employees"
    | "dashboard_summary"
    | "unknown";

  entity?: string;

  limit?: number;
}