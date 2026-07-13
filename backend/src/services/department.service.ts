import { departmentRepository } from "../repositories/department.repository.js";
import type {
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "../types/department.types.js";

export class DepartmentService {
  async getDepartments() {
    return departmentRepository.findAll();
  }

  async getDepartment(id: number) {
    const department = await departmentRepository.findById(id);

    if (!department) {
      throw new Error("Department not found");
    }

    return department;
  }

  async createDepartment(data: CreateDepartmentRequest) {
    const existingDepartment =
      await departmentRepository.findByName(data.name);

    if (existingDepartment) {
      throw new Error("Department already exists");
    }

    return departmentRepository.create(data.name);
  }

  async updateDepartment(
    id: number,
    data: UpdateDepartmentRequest
  ) {
    const department =
      await departmentRepository.findById(id);

    if (!department) {
      throw new Error("Department not found");
    }

    const existingDepartment =
      await departmentRepository.findByName(data.name);

    if (
      existingDepartment &&
      existingDepartment.id !== id
    ) {
      throw new Error("Department already exists");
    }

    return departmentRepository.update(id, data.name);
  }

  async deleteDepartment(id: number) {
    const department =
      await departmentRepository.findById(id);

    if (!department) {
      throw new Error("Department not found");
    }

    if (department._count.employees > 0) {
      throw new Error(
        "Cannot delete a department with employees."
      );
    }

    await departmentRepository.delete(id);

    return {
      message: "Department deleted successfully",
    };
  }
}

export const departmentService =
  new DepartmentService();