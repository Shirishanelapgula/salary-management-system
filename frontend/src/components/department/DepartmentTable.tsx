import type { Department } from "../../types/department.types";
import DepartmentRow from "./DepartmentRow";

interface Props {
  departments: Department[];
  onEdit(department: Department): void;
  onDelete(department: Department): void;
}

export default function DepartmentTable({
  departments,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-auto max-h-[calc(100vh-320px)] rounded-xl border bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Department
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Employees
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[180px]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="py-10 text-center text-gray-500"
              >
                No departments found. Try changing your search.
              </td>
            </tr>
          ) : (
            departments.map((department, index) => (
              <DepartmentRow
                key={department.id}
                department={department}
                striped={index % 2 === 0}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}