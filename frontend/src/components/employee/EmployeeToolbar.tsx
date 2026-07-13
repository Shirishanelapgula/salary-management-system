import Button from "../common/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

interface Props {
  onAdd(): void;
}

export default function EmployeeToolbar({ onAdd }: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Employees
        </h2>

        <p className="text-sm text-gray-500">
          Manage your employees and salary information
        </p>
      </div>

      <Button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
      >
        <PlusIcon className="h-5 w-5" />
        Add Employee
      </Button>
    </div>
  );
}