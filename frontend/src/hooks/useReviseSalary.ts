import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { reviseSalary } from "../api/salary.api";

export function useReviseSalary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      employeeId,
      data,
    }: {
      employeeId: number;
      data: {
        baseSalary: number;
        effectiveFrom: string;
      };
    }) => reviseSalary(employeeId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "employee-profile",
          variables.employeeId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "salary-history",
          variables.employeeId,
        ],
      });
    },
  });
}