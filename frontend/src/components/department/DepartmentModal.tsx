import Modal from "../common/Modal";

import DepartmentForm, {
  type DepartmentFormData,
} from "./DepartmentForm";

interface Props {
  open: boolean;
  title: string;
  loading?: boolean;

  defaultValues?: Partial<DepartmentFormData>;

  onClose(): void;

  onSubmit(data: DepartmentFormData): void;
}

export default function DepartmentModal({
  open,
  title,
  loading,
  defaultValues,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
    >
      <DepartmentForm
        defaultValues={defaultValues}
        loading={loading}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}