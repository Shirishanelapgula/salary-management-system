import api from "./axios";
import type {
    LoginRequest,
    LoginResponse,
} from "../types/auth.types";

export async function login(
    payload: LoginRequest
) {
    const { data } =
        await api.post<LoginResponse>(
            "/auth/login",
            payload
        );

    return data;
}