import { RuleBasedProvider } from "../ai/rule-based.provider.js";
import { aiQueryExecutor } from "../ai/query-executor.js";

export class AIService {
    private provider = new RuleBasedProvider();

    async execute(query: string) {
        const intent = await this.provider.parse(query);

        const result = await aiQueryExecutor.execute(intent);

        return {
            answer: this.formatResponse(intent.intent, result),
            raw: result,
        };
    }

    private formatResponse(intent: string, data: any): string {
        switch (intent) {
            case "employee_count":
                return `👥 There are currently ${data} employees in the organization.`;

            case "department_count":
                return `🏢 There are ${data} departments in the organization.`;

            case "country_count":
                return `🌍 Employees belong to ${data} different countries.`;

            case "average_salary":
                return `💰 The average employee salary is ₹${Number(
                    data
                ).toLocaleString()}.`;

            case "total_payroll":
                return `💸 The current monthly payroll is ₹${Number(
                    data
                ).toLocaleString()}.`;

            case "highest_paid":
                if (!data.length) {
                    return "No salary records found.";
                }

                return (
                    "🏆 Top 10 Highest Paid Employees\n\n" +
                    data
                        .map(
                            (e: any, i: number) =>
                                `${i + 1}. ${e.employee.firstName} ${e.employee.lastName}
Department : ${e.employee.department.name}
Country : ${e.employee.country.name}
Salary : ₹${Number(e.baseSalary).toLocaleString()}`
                        )
                        .join("\n\n")
                );

            case "lowest_paid":
                if (!data.length) {
                    return "No salary records found.";
                }

                return (
                    "📉 Lowest Paid Employees\n\n" +
                    data
                        .map(
                            (e: any, i: number) =>
                                `${i + 1}. ${e.employee.firstName} ${e.employee.lastName}
Department : ${e.employee.department.name}
Country : ${e.employee.country.name}
Salary : ₹${Number(e.baseSalary).toLocaleString()}`
                        )
                        .join("\n\n")
                );

            case "employees_by_department":
                return (
                    "👥 Employees by Department\n\n" +
                    data
                        .map(
                            (d: any) =>
                                `${d.name} : ${d._count.employees} employees`
                        )
                        .join("\n")
                );

            case "employees_by_country":
                return (
                    "🌍 Employees by Country\n\n" +
                    data
                        .map(
                            (c: any) =>
                                `${c.name} : ${c._count.employees} employees`
                        )
                        .join("\n")
                );

            case "employees_by_country_name":
                if (!data.length) {
                    return "No employees found for the requested country.";
                }

                return (
                    `🌍 Employees in ${data[0].country.name}\n\n` +
                    data
                        .map(
                            (e: any) =>
                                `👤 ${e.firstName} ${e.lastName}
Designation : ${e.designation}
Department : ${e.department.name}`
                        )
                        .join("\n\n")
                );

            case "department_salary_report":
                if (!data.length) {
                    return "No departments found.";
                }

                return (
                    "📊 Department Salary Report\n\n" +
                    data
                        .map((department: any) => {
                            const payroll = department.employees.reduce(
                                (sum: number, employee: any) => {
                                    const salary =
                                        employee.salaries.length > 0
                                            ? employee.salaries[0].baseSalary
                                            : 0;

                                    return sum + salary;
                                },
                                0
                            );

                            return `${department.name}
Employees : ${department.employees.length}
Payroll : ₹${payroll.toLocaleString()}`;
                        })
                        .join("\n\n")
                );

            case "recent_employees":
                return (
                    "🆕 Recently Joined Employees\n\n" +
                    data
                        .map(
                            (e: any) =>
                                `${e.firstName} ${e.lastName}
Department : ${e.department.name}
Country : ${e.country.name}`
                        )
                        .join("\n\n")
                );

            default:
                return "Sorry, I couldn't understand your request.";
        }
    }
}

export const aiService = new AIService();