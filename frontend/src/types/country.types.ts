export interface Country {
  id: number;
  name: string;
  currency: string;

  _count: {
    employees: number;
  };
}

export interface CreateCountryRequest {
  name: string;
  currency: string;
}

export interface UpdateCountryRequest {
  name: string;
  currency: string;
}