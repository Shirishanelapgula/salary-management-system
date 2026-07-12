import type { ChangeEvent } from "react";

interface EmployeeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmployeeSearch({
  value,
  onChange,
}: EmployeeSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search by name, email or Employee ID..."
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      style={{
        width: "350px",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
      }}
    />
  );
}