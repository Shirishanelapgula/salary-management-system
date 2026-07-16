import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../common/Button";
import Input from "../common/Input";

const schema = z.object({
  name: z.string().min(2, "Country name is required"),
  currency: z.string().min(2, "Currency is required"),
});

export type CountryFormData = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<CountryFormData>;
  loading?: boolean;
  onSubmit(data: CountryFormData): void;
}

export default function CountryForm({
  defaultValues,
  loading,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CountryFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label="Country"
        placeholder="India"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Currency"
        placeholder="INR"
        error={errors.currency?.message}
        {...register("currency")}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          Save Country
        </Button>
      </div>
    </form>
  );
}