import axios from "./axios";
import type {
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "../types/department.types";

export const getDepartments = async () =>
  (await axios.get("/departments")).data;

export const getDepartment = async (id: number) =>
  (await axios.get(`/departments/${id}`)).data;

export const createDepartment = async (
  payload: CreateDepartmentRequest
) => (await axios.post("/departments", payload)).data;

export const updateDepartment = async (
  id: number,
  payload: UpdateDepartmentRequest
) => (await axios.put(`/departments/${id}`, payload)).data;

export const deleteDepartment = async (id: number) =>
  (await axios.delete(`/departments/${id}`)).data;