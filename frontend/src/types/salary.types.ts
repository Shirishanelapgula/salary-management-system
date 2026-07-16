export interface Salary {
  id: number;

  baseSalary: number;

  currency: string;

  effectiveFrom: string;

  effectiveTo: string | null;

  isCurrent: boolean;

  employee: {
    id: number;

    firstName: string;

    lastName: string;

    department: {
      name: string;
    };

    country: {
      name: string;
    };
  };
}