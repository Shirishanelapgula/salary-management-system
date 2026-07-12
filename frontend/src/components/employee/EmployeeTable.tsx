import EmployeeRow from "./EmployeeRow";
import type { Employee } from "../../types/employee.types";

interface Props {
  employees: Employee[];

  onEdit(id: number): void;

  onDelete(id: number): void;
}

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table
      width="100%"
      cellPadding={12}
    >
      <thead>
        <tr>
          <th>ID</th>

          <th>Name</th>

          <th>Department</th>

          <th>Country</th>

          <th>Designation</th>

          <th>Salary</th>

          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map(
          (employee) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )
        )}
      </tbody>
    </table>
  );
}