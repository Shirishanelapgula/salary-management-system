import type { SalaryHistory } from "../../types/employeeProfile.types";

interface Props {
  salary: SalaryHistory | null;
}

export default function CurrentSalaryCard({
  salary,
}: Props) {
  return (
    <div className="rounded-xl bg-green-600 p-6 text-white shadow">

      <p className="text-lg">
        Current Salary
      </p>

      <h2 className="mt-3 text-4xl font-bold">

        {salary
          ? `₹ ${salary.baseSalary.toLocaleString()}`
          : "N/A"}

      </h2>

    </div>
  );
}