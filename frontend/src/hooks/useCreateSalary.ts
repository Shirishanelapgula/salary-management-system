import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { createSalary } from "../api/salary.api";

export function useCreateSalary() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createSalary,

    onSuccess: () => {
      toast.success(
        "Salary created successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["salaries"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.message ??
          "Failed to create salary"
      );
    },
  });
}