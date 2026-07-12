interface Props {
  open: boolean;

  onCancel(): void;

  onConfirm(): void;
}

export default function DeleteDialog({
  open,
  onCancel,
  onConfirm,
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
          padding: 25,
        }}
      >
        <h3>
          Delete Employee?
        </h3>

        <button
          onClick={onConfirm}
        >
          Delete
        </button>

        <button
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}