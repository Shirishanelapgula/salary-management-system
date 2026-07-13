import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function DashboardCharts({
  data,
}: Props) {
  return (
    <div className="rounded-2xl bg-white shadow p-6 h-[350px]">
      <h2 className="mb-6 text-xl font-semibold">
        Employees by Country
      </h2>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}