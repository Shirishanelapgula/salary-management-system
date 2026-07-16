import type { EmployeeProfile } from "../../types/employeeProfile.types";

interface Props {
  employee: EmployeeProfile["employee"];
}

export default function EmployeeInfoCard({
  employee,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-lg font-semibold">
        Employee Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>

          <p className="font-medium">
            {employee.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Department
          </p>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            {employee.department.name}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Country
          </p>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {employee.country.name}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Currency
          </p>

          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
            {employee.country.currency}
          </span>
        </div>

      </div>

    </div>
  );
}