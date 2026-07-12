import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employee.api";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: unknown;
    }) => updateEmployee(id, payload),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}