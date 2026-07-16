import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateEmployee } from "../api/employee.api";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: unknown;
    }) => updateEmployee(id, payload),

    onSuccess: () => {
      toast.success("Employee updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: (error: any) => {
      const message = error?.message
        ? `Unable to update employee: ${error.message}`
        : "Unable to update employee";
      toast.error(message);
    },
  });
}