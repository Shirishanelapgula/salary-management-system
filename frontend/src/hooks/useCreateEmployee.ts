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
      toast.error(error?.message ?? "Failed to create employee");
    },
  });
}