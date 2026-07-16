import { useQuery } from "@tanstack/react-query";

import { getEmployeeProfile } from "../api/employeeProfile.api";

export function useEmployeeProfile(id: number) {
  return useQuery({
    queryKey: ["employee-profile", id],

    queryFn: () =>
      getEmployeeProfile(id),

    enabled: !!id,
  });
}