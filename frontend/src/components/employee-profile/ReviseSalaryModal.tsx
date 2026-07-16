import Modal from "../common/Modal";

import ReviseSalaryForm from "./ReviseSalaryForm";

interface Props {
  open: boolean;

  loading: boolean;

  onClose(): void;

  onSubmit(data: {
    baseSalary: number;
    effectiveFrom: string;
  }): void;
}

export default function ReviseSalaryModal({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Modal
      open={open}
      title="Revise Salary"
      onClose={onClose}
    >
      <ReviseSalaryForm
        loading={loading}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}