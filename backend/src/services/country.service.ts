import { countryRepository } from "../repositories/country.repository.js";

import type {
  CreateCountryRequest,
  UpdateCountryRequest,
} from "../types/country.types.js";

export class CountryService {
  async getCountries() {
    return countryRepository.findAll();
  }

  async getCountry(id: number) {
    const country =
      await countryRepository.findById(id);

    if (!country) {
      throw new Error("Country not found");
    }

    return country;
  }

  async createCountry(
    data: CreateCountryRequest
  ) {
    const existing =
      await countryRepository.findByName(
        data.name
      );

    if (existing) {
      throw new Error(
        "Country already exists"
      );
    }

    return countryRepository.create(
      data.name,
      data.currency
    );
  }

  async updateCountry(
    id: number,
    data: UpdateCountryRequest
  ) {
    const country =
      await countryRepository.findById(id);

    if (!country) {
      throw new Error("Country not found");
    }

    const existing =
      await countryRepository.findByName(
        data.name
      );

    if (
      existing &&
      existing.id !== id
    ) {
      throw new Error(
        "Country already exists"
      );
    }

    return countryRepository.update(
      id,
      data.name,
      data.currency
    );
  }

  async deleteCountry(id: number) {
    const country =
      await countryRepository.findById(id);

    if (!country) {
      throw new Error("Country not found");
    }

    if (country._count.employees > 0) {
      throw new Error(
        "Cannot delete country because employees are assigned."
      );
    }

    await countryRepository.delete(id);

    return {
      message:
        "Country deleted successfully",
    };
  }
}

export const countryService =
  new CountryService();