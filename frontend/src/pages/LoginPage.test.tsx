import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { loginMock, useLoginMock, useAuthMock, toastSuccessMock, toastErrorMock } = vi.hoisted(() => ({
  loginMock: vi.fn(),
  useLoginMock: vi.fn(),
  useAuthMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
}));

vi.mock("../hooks/useLogin", () => ({
  useLogin: () => useLoginMock(),
}));

vi.mock("../context/AuthContext", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("react-hot-toast", () => ({
  toast: {
    success: toastSuccessMock,
    error: toastErrorMock,
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthMock.mockReturnValue({ login: loginMock, isAuthenticated: false });
    useLoginMock.mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({ data: { token: "abc" } }), isPending: false });
  });

  it("submits credentials and shows success toast", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/email/i), "user@example.com");
    await user.type(screen.getByPlaceholderText(/password/i), "secret");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(loginMock).toHaveBeenCalledWith("abc");
    expect(toastSuccessMock).toHaveBeenCalled();
  });

  it("shows an error toast when login fails", async () => {
    const user = userEvent.setup();
    useLoginMock.mockReturnValue({ mutateAsync: vi.fn().mockRejectedValue(new Error("bad")), isPending: false });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/email/i), "user@example.com");
    await user.type(screen.getByPlaceholderText(/password/i), "secret");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(toastErrorMock).toHaveBeenCalled();
  });
});
