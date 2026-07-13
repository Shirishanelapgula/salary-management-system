import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "../common/Button";
import Input from "../common/Input";

const schema = z.object({
  name: z.string().min(2, "Department name is required"),
});

export type DepartmentFormData = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<DepartmentFormData>;
  loading?: boolean;
  onSubmit(data: DepartmentFormData): void;
}

export default function DepartmentForm({
  defaultValues,
  loading = false,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label="Department Name"
        placeholder="Enter department name"
        error={errors.name?.message}
        {...register("name")}
      />

      <div className="flex justify-end">
        <Button loading={loading} type="submit">
          Save Department
        </Button>
      </div>
    </form>
  );
}