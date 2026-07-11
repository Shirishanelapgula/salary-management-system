import api from "./axios";

export const getDashboardSummary = async () => {
  const { data } = await api.get("/dashboard/summary");
  return data;
};

export const getSalaryByDepartment = async () => {
  const { data } = await api.get("/dashboard/salary-by-department");
  return data;
};

export const getCountryStats = async () => {
  const { data } = await api.get("/dashboard/country-stats");
  return data;
};