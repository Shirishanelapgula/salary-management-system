import Modal from "../common/Modal";
import EditSalaryForm from "./EditSalaryForm";

interface Props {
  open: boolean;
  salary: any;
  loading: boolean;
  onClose(): void;
  onSubmit(data: any): void;
}

export default function EditSalaryModal({
  open,
  salary,
  loading,
  onClose,
  onSubmit,
}: Props) {
  if (!salary) return null;

  return (
    <Modal
      open={open}
      title="Edit Salary"
      onClose={onClose}
    >
      <EditSalaryForm
        salary={salary}
        loading={loading}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}