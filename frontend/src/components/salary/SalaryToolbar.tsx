import SalarySearch from "./SalarySearch";
import SalaryFilters from "./SalaryFilters";

interface Props {
  search: string;
  department: string;
  country: string;

  onSearch(value: string): void;
  onDepartment(value: string): void;
  onCountry(value: string): void;
}

export default function SalaryToolbar({
  search,
  department,
  country,
  onSearch,
  onDepartment,
  onCountry,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow md:flex-row md:items-center md:justify-between">

      <div className="w-full md:w-80">
        <SalarySearch
          value={search}
          onChange={onSearch}
        />
      </div>

      <SalaryFilters
        department={department}
        country={country}
        onDepartmentChange={onDepartment}
        onCountryChange={onCountry}
      />

    </div>
  );
}