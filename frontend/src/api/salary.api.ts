import api from "./axios";

import type {
  SalaryFormData,
  SalaryQuery,
} from "../types/salary.types";

export async function getSalaries(
  params: SalaryQuery
) {
  const { data } = await api.get(
    "/salaries",
    {
      params,
    }
  );

  return data;
}

export async function createSalary(
  payload: SalaryFormData
) {
  const { data } = await api.post(
    "/salaries",
    payload
  );

  return data;
}

export async function updateSalary(
  id: number,
  payload: SalaryFormData
) {
  const { data } = await api.put(
    `/salaries/${id}`,
    payload
  );

  return data;
}

export async function deleteSalary(
  id: number
) {
  const { data } = await api.delete(
    `/salaries/${id}`
  );

  return data;
}

export async function getSalaryHistory(
  employeeId: number
) {
  const { data } = await api.get(
    `/salaries/history/${employeeId}`
  );

  return data;
}