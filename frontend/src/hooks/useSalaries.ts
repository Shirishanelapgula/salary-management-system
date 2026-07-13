import { useQuery } from "@tanstack/react-query";

import { getSalaries } from "../api/salary.api";

import type { SalaryQuery } from "../types/salary.types";

export function useSalaries(
  query: SalaryQuery
) {
  return useQuery({
    queryKey: ["salaries", query],
    queryFn: () => getSalaries(query),
  });
}