import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteEmployee } from "../api/employee.api";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onSuccess: () => {
      toast.success("Employee deleted");

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Delete failed");
    },
  });
}