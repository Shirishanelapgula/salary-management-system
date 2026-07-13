import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import Button from "../common/Button";
import Input from "../common/Input";

const schema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  designation: z.string().min(2, "Designation is required"),
  departmentId: z.number().min(1, "Department is required"),
  countryId: z.number().min(1, "Country is required"),
  baseSalary: z
  .number()
  .positive("Salary must be greater than 0"),
});

export type EmployeeFormData = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<EmployeeFormData>;
  loading?: boolean;
  onSubmit(data: EmployeeFormData): void;
}

export default function EmployeeForm({
  defaultValues,
  loading = false,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const submitHandler: SubmitHandler<EmployeeFormData> = (
    data
  ) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-2 gap-4"
    >
      <Input
        label="Employee ID"
        error={errors.employeeId?.message}
        {...register("employeeId")}
      />

      <Input
        label="First Name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />

      <Input
        label="Last Name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />

      <Input
        label="Email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Designation"
        error={errors.designation?.message}
        {...register("designation")}
      />

      <Input
        type="number"
        label="Department ID"
        error={errors.departmentId?.message}
        {...register("departmentId", {
          valueAsNumber: true,
        })}
      />

      <Input
        type="number"
        label="Country ID"
        error={errors.countryId?.message}
        {...register("countryId", {
          valueAsNumber: true,
        })}
      />

      <Input
        type="number"
        label="Base Salary"
        error={errors.baseSalary?.message}
        {...register("baseSalary", {
          valueAsNumber: true,
        })}
      />

      <div className="col-span-2 flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          Save Employee
        </Button>
      </div>
    </form>
  );
}