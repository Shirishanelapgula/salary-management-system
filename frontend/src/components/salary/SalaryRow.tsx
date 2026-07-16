import type { Salary } from "../../types/salary.types";
import SalaryActionMenu from "./SalaryActionMenu";


interface Props {
    salary: Salary;
    onEdit(salary: Salary): void;
    onDelete(salary: Salary): void;
}

export default function SalaryRow({
    salary,
    onEdit,
    onDelete,
}: Props) {
    return (
        <tr className="border-b hover:bg-gray-50">

            <td className="px-4 py-3">
                {salary.employee.firstName}{" "}
                {salary.employee.lastName}
            </td>

            <td className="px-4 py-3">
                {salary.employee.department.name}
            </td>

            <td className="px-4 py-3">
                {salary.employee.country.name}
            </td>

            <td className="px-4 py-3 font-medium">
                ₹ {salary.baseSalary.toLocaleString()}
            </td>

            <td className="px-4 py-3">
                {salary.currency}
            </td>

            <td className="px-4 py-3">
                {new Date(
                    salary.effectiveFrom
                ).toLocaleDateString()}
            </td>

            <td className="px-4 py-3">
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${salary.isCurrent
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                >
                    {salary.isCurrent
                        ? "Current"
                        : "Previous"}
                </span>
            </td>
            <td className="px-4 py-3">
                <SalaryActionMenu
                    onEdit={() => onEdit(salary)}
                    onDelete={() => onDelete(salary)}
                />
            </td>

        </tr>
    );
}