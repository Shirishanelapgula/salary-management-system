import type { Employee } from "../../types/employee.types";

interface Props {
    employee: Employee;

    onEdit(id: number): void;

    onDelete(id: number): void;
}

export default function EmployeeRow({
    employee,
    onEdit,
    onDelete,
}: Props) {
    return (
        <tr>
            <td>{employee.employeeId}</td>

            <td>
                {employee.firstName}{" "}
                {employee.lastName}
            </td>

            <td>
                {employee.department.name}
            </td>

            <td>
                {employee.country.name}
            </td>

            <td>
                {employee.designation}
            </td>

            <td>
                {employee.salaries[0]?.baseSalary ?? "-"}
            </td>

            <td>
                <button
                    onClick={() =>
                        onEdit(employee.id)
                    }
                >
                    Edit
                </button>

                <button
                    onClick={() =>
                        onDelete(employee.id)
                    }
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}