import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteDepartment } from "../api/department.api";

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,

    onSuccess: () => {
      toast.success("Department deleted");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Delete failed");
    },
  });
}