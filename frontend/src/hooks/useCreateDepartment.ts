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
      const message = error?.message
        ? `Unable to create department: ${error.message}`
        : "Unable to create department";
      toast.error(message);
    },
  });
}