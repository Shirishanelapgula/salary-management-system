import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateDepartment } from "../api/department.api";

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: {
        name: string;
      };
    }) => updateDepartment(id, payload),

    onSuccess: () => {
      toast.success("Department updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },

    onError: (error: any) => {
      const message = error?.message
        ? `Unable to update department: ${error.message}`
        : "Unable to update department";
      toast.error(message);
    },
  });
}