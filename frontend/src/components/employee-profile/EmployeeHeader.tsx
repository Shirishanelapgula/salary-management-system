import type { EmployeeProfile } from "../../types/employeeProfile.types";

interface Props {
  employee: EmployeeProfile["employee"];
}

export default function EmployeeHeader({
  employee,
}: Props) {
  const initials =
    employee.firstName[0] + employee.lastName[0];

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <div className="flex items-center gap-5">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
          {initials}
        </div>

        <div>

          <h1 className="text-3xl font-bold">
            {employee.firstName} {employee.lastName}
          </h1>

          <p className="mt-1 text-gray-500">
            {employee.designation}
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Employee ID : {employee.employeeId}
          </p>

        </div>

      </div>

    </div>
  );
}