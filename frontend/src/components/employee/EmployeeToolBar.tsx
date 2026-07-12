import type {
    ChangeEvent,
} from "react";

interface Props {
  search: string;

  onSearch(
    value: string
  ): void;

  onAdd(): void;
}

export default function EmployeeToolbar({
  search,
  onSearch,
  onAdd,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        marginBottom: 24,
      }}
    >
      <input
        placeholder="Search employee..."

        value={search}

        onChange={(
          e: ChangeEvent<HTMLInputElement>
        ) =>
          onSearch(e.target.value)
        }

        style={{
          width: 320,
          padding: 10,
        }}
      />

      <button onClick={onAdd}>
        Add Employee
      </button>
    </div>
  );
}