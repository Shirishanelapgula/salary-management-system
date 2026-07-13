import { useQuery } from "@tanstack/react-query";
import { getHighestPaid } from "../api/dashboard.api";

export function useHighestPaid() {
  return useQuery({
    queryKey: ["highest-paid"],
    queryFn: getHighestPaid,
  });
}