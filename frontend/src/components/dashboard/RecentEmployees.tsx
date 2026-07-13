import type { RecentEmployee } from "../../types/dashboard.types";

interface Props {
  employees: RecentEmployee[];
}

export default function RecentEmployees({
  employees,
}: Props) {
  return (
    <div className="rounded-2xl bg-white shadow p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Employees
      </h2>

      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="py-3 text-left">Employee</th>
            <th className="text-left">Department</th>
            <th className="text-left">Country</th>
            <th className="text-right">Salary</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-3">
                <div className="font-medium">
                  {employee.firstName} {employee.lastName}
                </div>

                <div className="text-sm text-gray-500">
                  {employee.employeeId}
                </div>
              </td>

              <td>{employee.department}</td>

              <td>{employee.country}</td>

              <td className="text-right font-semibold">
                ₹ {employee.salary.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}