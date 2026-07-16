import axios from "./axios";

import type {
  CreateCountryRequest,
  UpdateCountryRequest,
} from "../types/country.types";

export const getCountries = async () =>
  (await axios.get("/countries")).data;

export const getCountry = async (id: number) =>
  (await axios.get(`/countries/${id}`)).data;

export const createCountry = async (
  payload: CreateCountryRequest
) =>
  (await axios.post("/countries", payload)).data;

export const updateCountry = async (
  id: number,
  payload: UpdateCountryRequest
) =>
  (
    await axios.put(`/countries/${id}`, payload)
  ).data;

export const deleteCountry = async (id: number) =>
  (await axios.delete(`/countries/${id}`)).data;