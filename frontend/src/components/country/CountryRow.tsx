import Button from "../common/Button";
import type { Country } from "../../types/country.types";

interface Props {
    country: Country;
    striped?: boolean;
    onEdit(country: Country): void;
    onDelete(country: Country): void;
}

export default function CountryRow({
    country,
    striped,
    onEdit,
    onDelete,
}: Props) {
    return (
        <tr
            className={`border-b hover:bg-gray-50 transition ${striped ? "bg-gray-50/40" : "bg-white"
                }`}
        >
            <td className="px-6 py-4 font-medium">
                {country.name}
            </td>

            <td className="px-6 py-4">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {country.currency}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 font-medium">
                    {country._count.employees}
                </span>
            </td>

            <td className="px-6 py-4">
                <div className="flex gap-2">
                    <Button
                        className="bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => onEdit(country)}
                    >
                        Edit
                    </Button>

                    <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => onDelete(country)}
                    >
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    );
}