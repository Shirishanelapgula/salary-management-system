import { useQuery } from "@tanstack/react-query";

import {
  getDashboardSummary,
  getSalaryByDepartment,
  getCountryStats,
} from "../api/dashboard.api";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
  });
}

export function useDepartmentChart() {
  return useQuery({
    queryKey: ["department-chart"],
    queryFn: getSalaryByDepartment,
  });
}

export function useCountryChart() {
  return useQuery({
    queryKey: ["country-chart"],
    queryFn: getCountryStats,
  });
}