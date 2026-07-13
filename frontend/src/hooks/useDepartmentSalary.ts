import { useQuery } from "@tanstack/react-query";
import { getDepartmentSalary } from "../api/dashboard.api";

export function useDepartmentSalary() {
  return useQuery({
    queryKey: ["department-salary"],
    queryFn: getDepartmentSalary,
  });
}