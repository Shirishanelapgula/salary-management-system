import {
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import Button from "../common/Button";

interface Props {
  open: boolean;
  countryName: string;
  onCancel(): void;
  onConfirm(): void;
}

export default function DeleteCountryDialog({
  open,
  countryName,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[430px] rounded-2xl bg-white p-8 shadow-2xl">

        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <h2 className="mt-5 text-center text-xl font-semibold">
          Delete Country
        </h2>

        <p className="mt-3 text-center text-gray-600">
          Are you sure you want to delete
        </p>

        <p className="text-center font-semibold">
          {countryName}?
        </p>

        <p className="mt-2 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            className="bg-gray-200 text-black hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>

      </div>
    </div>
  );
}