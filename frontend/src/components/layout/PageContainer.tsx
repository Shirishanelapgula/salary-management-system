import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function PageContainer({
  title,
  children,
}: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-8 flex-shrink-0">
        <h1 className="text-4xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your employees and salary information
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}