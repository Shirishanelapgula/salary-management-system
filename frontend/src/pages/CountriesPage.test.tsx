import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const useCountriesMock = vi.fn();
const useCreateCountryMock = vi.fn();
const useUpdateCountryMock = vi.fn();
const useDeleteCountryMock = vi.fn();

vi.mock("../hooks/useCountries", () => ({ useCountries: () => useCountriesMock() }));
vi.mock("../hooks/useCreateCountry", () => ({ useCreateCountry: () => useCreateCountryMock() }));
vi.mock("../hooks/useUpdateCountry", () => ({ useUpdateCountry: () => useUpdateCountryMock() }));
vi.mock("../hooks/useDeleteCountry", () => ({ useDeleteCountry: () => useDeleteCountryMock() }));
vi.mock("../components/layout/PageContainer", () => ({ default: ({ title, children }: { title: string; children: React.ReactNode }) => <div><h1>{title}</h1>{children}</div> }));
vi.mock("../components/country/CountryToolbar", () => ({ default: ({ onAdd }: { onAdd: () => void }) => <button onClick={onAdd}>Add Country</button> }));
vi.mock("../components/country/CountrySearch", () => ({ default: () => <div>Country Search</div> }));
vi.mock("../components/country/CountryTable", () => ({ default: ({ countries }: { countries: Array<{ id: number; name: string }> }) => <div>{countries.map((c) => <p key={c.id}>{c.name}</p>)}</div> }));
vi.mock("../components/country/CountryModal", () => ({ default: ({ open, title }: { open: boolean; title: string }) => open ? <div>{title}</div> : null }));
vi.mock("../components/country/DeleteCountryDialog", () => ({ default: ({ open, countryName }: { open: boolean; countryName: string }) => open ? <div>{countryName}</div> : null }));

import CountriesPage from "./CountriesPage";

describe("CountriesPage", () => {
  it("renders the country table or empty state", () => {
    useCountriesMock.mockReturnValue({ data: [], isLoading: false });
    useCreateCountryMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useUpdateCountryMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useDeleteCountryMock.mockReturnValue({ mutateAsync: vi.fn() });

    render(<CountriesPage />);

    expect(screen.getByText(/countries/i)).toBeInTheDocument();
  });

  it("opens the add-country modal", async () => {
    const user = userEvent.setup();
    useCountriesMock.mockReturnValue({ data: [], isLoading: false });
    useCreateCountryMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useUpdateCountryMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useDeleteCountryMock.mockReturnValue({ mutateAsync: vi.fn() });

    render(<CountriesPage />);
    await user.click(screen.getByRole("button", { name: /add country/i }));

    expect(screen.getAllByText("Add Country").length).toBeGreaterThan(0);
  });
});
