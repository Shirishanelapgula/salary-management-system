import { useForm } from "react-hook-form";

interface Props {
  loading: boolean;

  onSubmit(data: {
    baseSalary: number;
    effectiveFrom: string;
  }): void;
}

export default function ReviseSalaryForm({
  loading,
  onSubmit,
}: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      baseSalary: 0,
      effectiveFrom: new Date()
        .toISOString()
        .split("T")[0],
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
          Effective From
        </label>

        <input
          type="date"
          {...register("effectiveFrom")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
      >
        Save Salary
      </button>
    </form>
  );
}