import axios from "./axios";

export interface AIRequest {
  query: string;
}

export const askAI = async (data: AIRequest) => {
  const response = await axios.post("/ai", data);

  return response.data;
};