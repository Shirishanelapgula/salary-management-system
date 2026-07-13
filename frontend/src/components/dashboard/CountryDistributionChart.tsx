import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
} from "recharts";

import { useCountryStats } from "../../hooks/useCountryStats";

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#f97316",
    "#84cc16",
];

export default function CountryDistributionChart() {
    const { data, isLoading } = useCountryStats();

    if (isLoading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow">
                Loading...
            </div>
        );
    }

    const countries = data?.data ?? [];

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">
                Employees by Country
            </h2>

            <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                    <Pie
                        data={countries}
                        dataKey="employeeCount"
                        nameKey="country"
                        outerRadius={110}
                        label={false}
                    >
                        {countries.map((_: unknown, index: number) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />

                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}