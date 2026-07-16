import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCountry } from "../api/country.api";

export function useDeleteCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCountry,

    onSuccess: () => {
      toast.success("Country deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["countries"],
      });
    },

    onError: (error: any) => {
      const message = error?.message
        ? `Unable to delete country: ${error.message}`
        : "Unable to delete country";
      toast.error(message);
    },
  });
}