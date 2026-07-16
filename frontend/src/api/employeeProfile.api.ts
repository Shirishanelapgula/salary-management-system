import axios from "./axios";

export async function getEmployeeProfile(id: number) {
  const response = await axios.get(
    `/employees/${id}/profile`
  );

  return response.data;
}