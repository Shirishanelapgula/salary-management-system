interface Props {
  department: string;
  country: string;

  onDepartmentChange: (value: string) => void;
  onCountryChange: (value: string) => void;
}

const departments = [
  "",
  "Engineering",
  "HR",
  "Finance",
  "Sales",
  "Marketing",
];

const countries = [
  "",
  "India",
  "USA",
  "UK",
  "Canada",
];

export default function EmployeeFilters({
  department,
  country,
  onDepartmentChange,
  onCountryChange,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
      }}
    >
      <select
        value={department}
        onChange={(e) =>
          onDepartmentChange(e.target.value)
        }
      >
        {departments.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item || "All Departments"}
          </option>
        ))}
      </select>

      <select
        value={country}
        onChange={(e) =>
          onCountryChange(e.target.value)
        }
      >
        {countries.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item || "All Countries"}
          </option>
        ))}
      </select>
    </div>
  );
}