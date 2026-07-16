import Modal from "../common/Modal";

import CountryForm, {
  type CountryFormData,
} from "./CountryForm";

interface Props {
  open: boolean;
  title: string;
  loading?: boolean;
  defaultValues?: Partial<CountryFormData>;

  onClose(): void;
  onSubmit(data: CountryFormData): void;
}

export default function CountryModal({
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
      <CountryForm
        defaultValues={defaultValues}
        loading={loading}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}