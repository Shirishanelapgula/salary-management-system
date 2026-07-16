import type { SalaryHistory } from "../../types/employeeProfile.types";

import SalaryHistoryRow from "./SalaryHistoryRow";

interface Props {
  history: SalaryHistory[];
}

export default function SalaryHistoryTable({
  history,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-lg font-semibold">
        Salary History
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b bg-gray-50">

            <th className="px-6 py-4 text-left">
              Salary
            </th>

            <th className="px-6 py-4 text-left">
              Effective From
            </th>

            <th className="px-6 py-4 text-left">
              Effective To
            </th>

          </tr>

        </thead>

        <tbody>

          {history.map((salary) => (
            <SalaryHistoryRow
              key={salary.id}
              salary={salary}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}