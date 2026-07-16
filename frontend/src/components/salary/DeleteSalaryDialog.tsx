import Modal from "../common/Modal";

interface Props {
  open: boolean;
  loading: boolean;
  onClose(): void;
  onDelete(): void;
}

export default function DeleteSalaryDialog({
  open,
  loading,
  onClose,
  onDelete,
}: Props) {
  return (
    <Modal
      open={open}
      title="Delete Salary"
      onClose={onClose}
    >
      <p className="mb-6">
        Are you sure you want to delete this salary?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border px-4 py-2"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          onClick={onDelete}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}