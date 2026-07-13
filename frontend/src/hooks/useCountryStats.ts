import { useQuery } from "@tanstack/react-query";
import { getCountryStats } from "../api/dashboard.api";

export function useCountryStats() {
  return useQuery({
    queryKey: ["country-stats"],
    queryFn: getCountryStats,
  });
}