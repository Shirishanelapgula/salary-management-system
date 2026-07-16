import type { Country } from "../../types/country.types";
import CountryRow from "./CountryRow";

interface Props {
  countries: Country[];
  onEdit(country: Country): void;
  onDelete(country: Country): void;
}

export default function CountryTable({
  countries,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-auto max-h-[calc(100vh-320px)] rounded-xl border bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Country
            </th>

            <th className="px-6 py-4 text-left">
              Currency
            </th>

            <th className="px-6 py-4 text-left">
              Employees
            </th>

            <th className="px-6 py-4 text-left min-w-[180px]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {countries.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-10 text-center text-gray-500"
              >
                No countries found. Try changing your search.
              </td>
            </tr>
          ) : (
            countries.map((country, index) => (
              <CountryRow
                key={country.id}
                country={country}
                striped={index % 2 === 0}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}