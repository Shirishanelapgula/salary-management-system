import { type ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function PageContainer({
  title,
  children,
}: Props) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        {title}
      </h2>

      {children}
    </>
  );
}