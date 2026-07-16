interface Props {
    onEdit(): void;
    onDelete(): void;
}

export default function SalaryActionMenu({
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="flex gap-2">
            <button
                onClick={() => {
                    onEdit();
                }}
                className="rounded bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-200"
            >
                Edit
            </button>

            <button
                onClick={() => {
                    onDelete();
                }}
                className="rounded bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200"
            >
                Delete
            </button>
        </div>
    );
}