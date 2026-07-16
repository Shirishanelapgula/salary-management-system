import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSalary } from "../api/salary.api";

export function useUpdateSalary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSalary,

    onSuccess: () => {
      toast.success("Salary updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["salaries"],
      });
    },

    onError: (error: any) => {
      const message = error?.message
        ? `Unable to update salary: ${error.message}`
        : "Unable to update salary";
      toast.error(message);
    },
  });
}