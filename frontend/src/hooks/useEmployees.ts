import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../api/employee.api";
import type { EmployeeQuery } from "../types/employee.types";

export function useEmployees(
  params: EmployeeQuery
) {
  return useQuery({
    queryKey: ["employees", params],

    queryFn: () => getEmployees(params),

    staleTime: 60000,
  });
}