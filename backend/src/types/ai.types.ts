export interface AIQueryRequest {
  query: string;
}

export interface ParsedIntent {
  intent:
    | "employee_search"
    | "salary_stats"
    | "dashboard_summary"
    | "highest_paid"
    | "lowest_paid"
    | "unknown";

  filters?: {
    designation?: string;
    department?: string;
    country?: string;
    salaryGreaterThan?: number;
    salaryLessThan?: number;
  };
}