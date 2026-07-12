import api from "./axios";
import type { EmployeeQuery } from "../types/employee.types";

export const getEmployees = async (
  params: EmployeeQuery
) => {
  const { data } = await api.get("/employees", {
    params,
  });

  return data;
};

export const getEmployee = async (
  id: number
) => {
  const { data } = await api.get(`/employees/${id}`);

  return data;
};

export const createEmployee = async (
  payload: unknown
) => {
  const { data } = await api.post(
    "/employees",
    payload
  );

  return data;
};

export const updateEmployee = async (
  id: number,
  payload: unknown
) => {
  const { data } = await api.put(
    `/employees/${id}`,
    payload
  );

  return data;
};

export const deleteEmployee = async (
  id: number
) => {
  const { data } = await api.delete(
    `/employees/${id}`
  );

  return data;
};