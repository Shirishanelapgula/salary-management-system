import Button from "../common/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
    open: boolean;
    employeeName?: string;
    onCancel(): void;
    onConfirm(): void;
}

export default function DeleteDialog({
    open,
    employeeName,
    onCancel,
    onConfirm,
}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-[420px] rounded-xl bg-white p-6 shadow-2xl">

                {/* Header */}
                <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <ExclamationTriangleIcon className="h-7 w-7 text-red-600" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Delete Employee
                        </h2>

                        <p className="text-sm text-gray-500">
                            This action cannot be undone.
                        </p>
                    </div>

                </div>

                {/* Body */}

                <p className="mb-8 text-gray-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-900">
                        {employeeName}
                    </span>
                    ? This action cannot be undone.
                </p>

                {/* Footer */}

                <div className="flex justify-end gap-3">

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