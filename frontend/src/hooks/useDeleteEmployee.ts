import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteEmployee } from "../api/employee.api";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onSuccess: () => {
      toast.success("Employee deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: (error: any) => {
      const message = error?.message
        ? `Unable to delete employee: ${error.message}`
        : "Unable to delete employee";
      toast.error(message);
    },
  });
}