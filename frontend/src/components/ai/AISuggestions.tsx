interface Props {
  onSelect(prompt: string): void;
}

const suggestions = [
  "Show highest paid employees",
  "Total payroll",
  "Employees in India",
  "Department salary report",
  "Lowest paid employees",
];

export default function AISuggestions({
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className="rounded-full bg-white px-4 py-2 shadow hover:bg-blue-50"
        >
          {item}
        </button>
      ))}

    </div>
  );
}