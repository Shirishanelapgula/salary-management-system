import type { SalaryHistory } from "../../types/employeeProfile.types";

interface Props {
  history: SalaryHistory[];
}

export default function SalaryTrendCard({
  history,
}: Props) {

  if (history.length < 2) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        No salary trend available.
      </div>
    );
  }

  const latest = history[0].baseSalary;

  const first =
    history[history.length - 1].baseSalary;

  const growth =
    (((latest - first) / first) * 100).toFixed(1);

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <p className="text-gray-500">
        Salary Growth
      </p>

      <h2 className="mt-3 text-4xl font-bold text-green-600">
        +{growth}%
      </h2>

      <p className="mt-2 text-gray-500">

        ₹ {first.toLocaleString()} → ₹ {latest.toLocaleString()}

      </p>

    </div>
  );
}