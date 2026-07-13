import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}