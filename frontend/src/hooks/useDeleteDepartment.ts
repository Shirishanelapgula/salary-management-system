import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteDepartment } from "../api/department.api";

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,

    onSuccess: () => {
      toast.success("Department deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },

    onError: (error: any) => {
      const message = error?.message
        ? `Unable to delete department: ${error.message}`
        : "Unable to delete department";
      toast.error(message);
    },
  });
}