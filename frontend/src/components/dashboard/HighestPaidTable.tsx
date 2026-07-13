import { useHighestPaid } from "../../hooks/useHighestPaid";

export default function HighestPaidTable() {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useHighestPaid();

    console.log({
        data,
        isLoading,
        isError,
        error,
    });


    if (isLoading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow">
                Loading...
            </div>
        );
    }

    const employees = data?.data ?? [];
    console.log("Highest Paid API Response:", data);
    console.log("Employees:", employees);

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">
                Highest Paid Employees
            </h2>

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 text-left">Employee</th>
                        <th className="py-2 text-right">Salary</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((salary: any) => (
                        <tr
                            key={salary.id}
                            className="border-b hover:bg-gray-50 transition-colors"
                        >
                            <td className="py-3">
                                {salary.employee
                                    ? `${salary.employee.firstName} ${salary.employee.lastName}`
                                    : "Unknown Employee"}
                            </td>

                            <td className="py-3 text-right font-medium">
                                ₹ {Number(salary.baseSalary).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}