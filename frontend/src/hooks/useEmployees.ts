import {
  useQuery
} from "@tanstack/react-query";

import {
  getEmployees,
  type EmployeeQueryParams
} from "../api/employee.api";


export function useEmployees(
  params: EmployeeQueryParams
) {

  return useQuery({

    queryKey: [
      "employees",
      params
    ],

    queryFn: () =>
      getEmployees(params),

    staleTime: 30000

  });

}