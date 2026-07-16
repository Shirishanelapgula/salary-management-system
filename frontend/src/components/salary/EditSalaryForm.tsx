import { useForm } from "react-hook-form";

interface Props {
  salary: any;
  loading: boolean;
  onSubmit(data: any): void;
}

export default function EditSalaryForm({
  salary,
  loading,
  onSubmit,
}: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      baseSalary: salary.baseSalary,
      currency: salary.currency,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Base Salary
        </label>

        <input
          type="number"
          {...register("baseSalary", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Currency
        </label>

        <input
          {...register("currency")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 text-white"
      >
        Save Changes
      </button>
    </form>
  );
}