import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { deleteSalary } from "../api/salary.api";

export function useDeleteSalary() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteSalary,

    onSuccess: () => {
      toast.success(
        "Salary deleted successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["salaries"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.message ??
          "Delete failed"
      );
    },
  });
}