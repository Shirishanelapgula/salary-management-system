import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEmployee } from "../api/employee.api";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: () => {
      toast.success("Employee created successfully");
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: (error: any) => {
      const message = error?.message
        ? `Unable to create employee: ${error.message}`
        : "Unable to create employee";
      toast.error(message);
    },
  });
}