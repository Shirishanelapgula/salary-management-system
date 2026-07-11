import api from "./axios";

export interface EmployeeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: number;
  countryId?: number;
}

export const getEmployees = async (
  params?: EmployeeQueryParams
) => {
  const response = await api.get("/employees", {
    params,
  });

  return response.data;
};


export const getEmployeeById = async (
  id: number
) => {
  const response = await api.get(`/employees/${id}`);

  return response.data;
};


export const createEmployee = async (
  payload: unknown
) => {
  const response = await api.post(
    "/employees",
    payload
  );

  return response.data;
};


export const updateEmployee = async (
  id: number,
  payload: unknown
) => {
  const response = await api.put(
    `/employees/${id}`,
    payload
  );

  return response.data;
};


export const deleteEmployee = async (
  id: number
) => {
  const response = await api.delete(
    `/employees/${id}`
  );

  return response.data;
};