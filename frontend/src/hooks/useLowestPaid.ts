import { useQuery } from "@tanstack/react-query";
import { getLowestPaid } from "../api/dashboard.api";

export function useLowestPaid() {
  return useQuery({
    queryKey: ["lowest-paid"],
    queryFn: getLowestPaid,
  });
}