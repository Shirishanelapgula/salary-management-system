export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;

    data: {
        token: string;

        user: {
            id: number;
            role: string;

            employee: {
                id: number;
                employeeId: string;
                firstName: string;
                lastName: string;
                email: string;
                designation: string;
                departmentId: number;
                countryId: number;
            };
        };
    };
}