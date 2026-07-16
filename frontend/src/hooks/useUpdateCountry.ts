import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCountry } from "../api/country.api";

export function useUpdateCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: {
        name: string;
        currency: string;
      };
    }) =>
      updateCountry(id, payload),

    onSuccess: () => {
      toast.success("Country updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["countries"],
      });
    },

    onError: (error: any) => {
      const message = error?.message
        ? `Unable to update country: ${error.message}`
        : "Unable to update country";
      toast.error(message);
    },
  });
}