import axios from "./axios";

export const getDashboardSummary = async () =>
  (await axios.get("/dashboard/summary")).data;

export const getDepartmentSalary = async () =>
  (await axios.get("/dashboard/salary-by-department")).data;

export const getCountryStats = async () =>
  (await axios.get("/dashboard/country-stats")).data;

export const getHighestPaid = async () =>
  (await axios.get("/dashboard/highest-paid")).data;

export const getLowestPaid = async () =>
  (await axios.get("/dashboard/lowest-paid")).data;