import Button from "../common/Button";
import type { Employee } from "../../types/employee.types";

interface Props {
    employee: Employee;
    striped?: boolean;
    onEdit(employee: Employee): void;
    onDelete(employee: Employee): void;
}

export default function EmployeeRow({
    employee,
    striped,
    onEdit,
    onDelete,
}: Props) {
    return (
        <tr
            className={`border-b transition-colors hover:bg-blue-50 ${striped ? "bg-white" : "bg-gray-50"
                }`}
        >
            <td className="px-6 py-4">{employee.employeeId}</td>

            <td className="px-6 py-4">
                {employee.firstName} {employee.lastName}
            </td>

            <td className="px-6 py-4">{employee.email}</td>

            <td className="px-6 py-4">{employee.department.name}</td>

            <td className="px-6 py-4">{employee.country.name}</td>

            <td className="px-6 py-4">
                {employee.salaries[0]?.baseSalary ?? "-"}
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center gap-2 whitespace-nowrap">
                    <Button
                        className="bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => onEdit(employee)}
                    >
                        Edit
                    </Button>

                    <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => onDelete(employee)}
                    >
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    );
}