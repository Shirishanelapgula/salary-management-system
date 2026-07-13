import Modal from "../common/Modal";
import EmployeeForm, {
  type EmployeeFormData,
} from "./EmployeeForm";

interface Props {
  open: boolean;
  title: string;
  loading?: boolean;

  defaultValues?: Partial<EmployeeFormData>;

  onClose(): void;

  onSubmit(data: EmployeeFormData): void;
}

export default function EmployeeModal({
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
      <EmployeeForm
        defaultValues={defaultValues}
        loading={loading}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}