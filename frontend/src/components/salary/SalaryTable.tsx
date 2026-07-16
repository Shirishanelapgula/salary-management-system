import type { ComponentType } from "react";
import type { Salary } from "../../types/salary.types";

import SalaryRow from "./SalaryRow";

type SalaryRowComponentProps = {
    salary: Salary;

    onEdit(salary: Salary): void;

    onDelete(salary: Salary): void;
};

const SalaryRowComponent = SalaryRow as ComponentType<SalaryRowComponentProps>;

interface Props {
    salaries: Salary[];

    onEdit(salary: Salary): void;

    onDelete(salary: Salary): void;
}

export default function SalaryTable({
    salaries,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-4 py-3 text-left">
                            Employee
                        </th>

                        <th className="px-4 py-3 text-left">
                            Department
                        </th>

                        <th className="px-4 py-3 text-left">
                            Country
                        </th>

                        <th className="px-4 py-3 text-left">
                            Salary
                        </th>

                        <th className="px-4 py-3 text-left">
                            Currency
                        </th>

                        <th className="px-4 py-3 text-left">
                            Effective From
                        </th>

                        <th className="px-4 py-3 text-left">
                            Status
                        </th>

                        <th className="px-4 py-3 text-left">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {salaries.map((salary) => (
                        <SalaryRowComponent
                            key={salary.id}
                            salary={salary}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}

                </tbody>

            </table>

        </div>
    );
}