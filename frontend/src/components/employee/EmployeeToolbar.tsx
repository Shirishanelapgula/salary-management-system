interface Props {
  onAdd(): void;
}

export default function EmployeeToolbar({
  onAdd,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px",
      }}
    >
      <button onClick={onAdd}>
        + Add Employee
      </button>
    </div>
  );
}