import EmployeeForm, {
  type EmployeeFormData,
} from "./EmployeeForm";

interface Props {
  open: boolean;

  onClose(): void;

  onSubmit(
    data: EmployeeFormData
  ): void;
}

export default function EmployeeModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#00000080",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 30,
          width: 500,
        }}
      >
        <h2>Add Employee</h2>

        <EmployeeForm
          onSubmit={onSubmit}
        />

        <button
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}