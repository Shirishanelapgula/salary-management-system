interface Props {
  department: string;
  country: string;

  onDepartmentChange(value: string): void;
  onCountryChange(value: string): void;
}

export default function SalaryFilters({
  department,
  country,
  onDepartmentChange,
  onCountryChange,
}: Props) {
  return (
    <div className="flex gap-3">

      <input
        value={department}
        onChange={(e) =>
          onDepartmentChange(e.target.value)
        }
        placeholder="Department"
        className="rounded-lg border px-3 py-2"
      />

      <input
        value={country}
        onChange={(e) =>
          onCountryChange(e.target.value)
        }
        placeholder="Country"
        className="rounded-lg border px-3 py-2"
      />

    </div>
  );
}