import type { Employee } from "../../types/employee.types";
import EmployeeRow from "./EmployeeRow";

interface Props {
  employees: Employee[];
  onEdit(employee: Employee): void;
  onDelete(employee: Employee): void;
}

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-auto max-h-[calc(100vh-320px)] rounded-xl border border-gray-200">
      <table className="w-full border-collapse bg-white">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Department
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Country
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Salary
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[180px]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee, index) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              striped={index % 2 === 0}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}