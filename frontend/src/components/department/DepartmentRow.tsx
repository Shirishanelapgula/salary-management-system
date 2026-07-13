import Button from "../common/Button";
import type { Department } from "../../types/department.types";

interface Props {
  department: Department;
  striped?: boolean;
  onEdit(department: Department): void;
  onDelete(department: Department): void;
}

export default function DepartmentRow({
  department,
  striped,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr
      className={`border-b hover:bg-gray-50 transition ${
        striped ? "bg-gray-50/40" : "bg-white"
      }`}
    >
      <td className="px-6 py-4 font-medium">
        {department.name}
      </td>

      <td className="px-6 py-4">
        {department._count.employees}
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-2">
          <Button
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={() => onEdit(department)}
          >
            Edit
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => onDelete(department)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}