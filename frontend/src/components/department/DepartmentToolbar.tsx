import Button from "../common/Button";

interface Props {
  onAdd(): void;
}

export default function DepartmentToolbar({
  onAdd,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          Departments
        </h2>

        <p className="text-sm text-gray-500">
          Manage company departments
        </p>
      </div>

      <Button onClick={onAdd}>
        + Add Department
      </Button>
    </div>
  );
}