import Button from "../common/Button";

interface Props {
  onAdd(): void;
}

export default function CountryToolbar({
  onAdd,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          Countries
        </h2>

        <p className="text-sm text-gray-500">
          Manage company countries
        </p>
      </div>

      <Button onClick={onAdd}>
        + Add Country
      </Button>
    </div>
  );
}