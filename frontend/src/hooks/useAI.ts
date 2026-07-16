import { useMutation } from "@tanstack/react-query";

import { askAI } from "../api/ai.api";

export function useAI() {
  return useMutation({
    mutationFn: askAI,
  });
}