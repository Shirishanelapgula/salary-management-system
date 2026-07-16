import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCountry } from "../api/country.api";

export function useCreateCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCountry,

    onSuccess: () => {
      toast.success("Country created successfully");

      queryClient.invalidateQueries({
        queryKey: ["countries"],
      });
    },

    onError: (error: any) => {
      const message = error?.message
        ? `Unable to create country: ${error.message}`
        : "Unable to create country";
      toast.error(message);
    },
  });
}