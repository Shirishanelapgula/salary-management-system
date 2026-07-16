import type { SalaryHistory } from "../../types/employeeProfile.types";

interface Props {
  salary: SalaryHistory;
}

export default function SalaryHistoryRow({
  salary,
}: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="px-6 py-4">
        ₹ {salary.baseSalary.toLocaleString()}
      </td>

      <td className="px-6 py-4">
        {new Date(
          salary.effectiveFrom
        ).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">

        {salary.effectiveTo
          ? new Date(
              salary.effectiveTo
            ).toLocaleDateString()
          : (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              Current
            </span>
          )}

      </td>

    </tr>
  );
}