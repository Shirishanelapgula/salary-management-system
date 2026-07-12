import { useForm } from "react-hook-form";

export interface EmployeeFormData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  departmentId: number;
  countryId: number;
  baseSalary: number;
}

interface Props {
  defaultValues?: Partial<EmployeeFormData>;
  onSubmit(data: EmployeeFormData): void;
}

export default function EmployeeForm({
  defaultValues,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
  } = useForm<EmployeeFormData>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder="Employee ID"
        {...register("employeeId")}
      />

      <input
        placeholder="First Name"
        {...register("firstName")}
      />

      <input
        placeholder="Last Name"
        {...register("lastName")}
      />

      <input
        placeholder="Email"
        {...register("email")}
      />

      <input
        placeholder="Designation"
        {...register("designation")}
      />

      <input
        type="number"
        placeholder="Department Id"
        {...register("departmentId", {
          valueAsNumber: true,
        })}
      />

      <input
        type="number"
        placeholder="Country Id"
        {...register("countryId", {
          valueAsNumber: true,
        })}
      />

      <input
        type="number"
        placeholder="Base Salary"
        {...register("baseSalary", {
          valueAsNumber: true,
        })}
      />

      <button type="submit">
        Save Employee
      </button>
    </form>
  );
}