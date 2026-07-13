import Input from "../common/Input";

interface Props {
  value: string;
  onChange(value: string): void;
}

export default function DepartmentSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-6 max-w-sm">
      <Input
        placeholder="Search department..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}