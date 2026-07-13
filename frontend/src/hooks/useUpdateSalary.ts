import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updateSalary } from "../api/salary.api";

export function useUpdateSalary() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: any;
    }) =>
      updateSalary(id, payload),

    onSuccess: () => {
      toast.success(
        "Salary updated successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["salaries"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.message ??
          "Update failed"
      );
    },
  });
}