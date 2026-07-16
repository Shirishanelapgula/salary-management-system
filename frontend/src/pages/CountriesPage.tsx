import { useMemo, useState } from "react";

import PageContainer from "../components/layout/PageContainer";

import CountryToolbar from "../components/country/CountryToolbar";
import CountrySearch from "../components/country/CountrySearch";
import CountryTable from "../components/country/CountryTable";
import CountryModal from "../components/country/CountryModal";
import DeleteCountryDialog from "../components/country/DeleteCountryDialog";

import { useCountries } from "../hooks/useCountries";
import { useCreateCountry } from "../hooks/useCreateCountry";
import { useUpdateCountry } from "../hooks/useUpdateCountry";
import { useDeleteCountry } from "../hooks/useDeleteCountry";

import type { Country } from "../types/country.types";
import type { CountryFormData } from "../components/country/CountryForm";

export default function CountriesPage() {
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCountry, setEditingCountry] =
    useState<Country | null>(null);

  const [deleteCountry, setDeleteCountry] =
    useState<Country | null>(null);

  const { data, isLoading } = useCountries();

  const createMutation = useCreateCountry();

  const updateMutation = useUpdateCountry();

  const deleteMutation = useDeleteCountry();

  const filteredCountries = useMemo(() => {
    const countries = data?.data ?? data ?? [];

    return countries.filter((country: Country) =>
      country.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const defaultValues = useMemo(() => {
    if (!editingCountry) return undefined;

    return {
      name: editingCountry.name,
      currency: editingCountry.currency,
    };
  }, [editingCountry]);

  const handleSubmit = async (
    formData: CountryFormData
  ) => {
    if (editingCountry) {
      await updateMutation.mutateAsync({
        id: editingCountry.id,
        payload: formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }

    setEditingCountry(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <PageContainer title="Countries">
        <div className="flex min-h-[50vh] items-center justify-center">
          Loading...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Countries">

      <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow">

        <CountryToolbar
          onAdd={() => {
            setEditingCountry(null);
            setIsModalOpen(true);
          }}
        />

        <CountrySearch
          value={search}
          onChange={setSearch}
        />

        <div className="mt-6 flex-1 overflow-hidden">

          <CountryTable
            countries={filteredCountries}
            onEdit={(country) => {
              setEditingCountry(country);
              setIsModalOpen(true);
            }}
            onDelete={(country) =>
              setDeleteCountry(country)
            }
          />

        </div>

      </div>

      <CountryModal
        open={isModalOpen}
        title={
          editingCountry
            ? "Edit Country"
            : "Add Country"
        }
        defaultValues={defaultValues}
        loading={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onClose={() => {
          setEditingCountry(null);
          setIsModalOpen(false);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteCountryDialog
        open={!!deleteCountry}
        countryName={deleteCountry?.name ?? ""}
        onCancel={() =>
          setDeleteCountry(null)
        }
        onConfirm={async () => {
          if (!deleteCountry) return;

          if (!window.confirm("Are you sure you want to delete this country?")) {
            return;
          }

          await deleteMutation.mutateAsync(
            deleteCountry.id
          );

          setDeleteCountry(null);
        }}
      />

    </PageContainer>
  );
}