import axios from "./axios";

/* ===========================================
   Salary Management
=========================================== */

export const getSalaries = async () =>
  (await axios.get("/salaries")).data;

export const getSalary = async (id: number) =>
  (await axios.get(`/salaries/${id}`)).data;

export const updateSalary = async ({
  id,
  data,
}: {
  id: number;
  data: any;
}) =>
  (await axios.put(`/salaries/${id}`, data)).data;

export const deleteSalary = async (id: number) =>
  (await axios.delete(`/salaries/${id}`)).data;

/* ===========================================
   Employee Salary APIs
=========================================== */

export const getCurrentSalary = async (employeeId: number) =>
  (await axios.get(`/employees/${employeeId}/salary`)).data;

export const getSalaryHistory = async (employeeId: number) =>
  (await axios.get(`/employees/${employeeId}/salary/history`)).data;

export const reviseSalary = async (
  employeeId: number,
  data: {
    baseSalary: number;
    effectiveFrom: string;
  }
) =>
  (
    await axios.post(
      `/employees/${employeeId}/salary`,
      data
    )
  ).data;