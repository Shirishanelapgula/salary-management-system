export interface Department {
  id: number;
  name: string;
  _count: {
    employees: number;
  };
}

export interface CreateDepartmentRequest {
  name: string;
}

export interface UpdateDepartmentRequest {
  name: string;
}