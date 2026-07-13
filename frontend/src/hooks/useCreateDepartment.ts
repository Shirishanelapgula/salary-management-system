import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createDepartment } from "../api/department.api";

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,

    onSuccess: () => {
      toast.success("Department created successfully");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to create department");
    },
  });
}