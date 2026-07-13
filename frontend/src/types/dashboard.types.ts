export interface DashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  totalCountries: number;
  monthlyPayroll: number;
}

export interface RecentEmployee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  department: string;
  country: string;
  salary: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  recentEmployees: RecentEmployee[];
}