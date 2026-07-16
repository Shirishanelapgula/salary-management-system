import { useQuery } from "@tanstack/react-query";
import { getSalaries } from "../api/salary.api";

export function useSalaries() {
  return useQuery({
    queryKey: ["salaries"],
    queryFn: getSalaries,
  });
}