import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ProtectedRoute from "./ProtectedRoute";

const useAuthMock = vi.fn();
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => useAuthMock(),
}));

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to login", () => {
    useAuthMock.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/secure"]}>
        <Routes>
          <Route path="/login" element={<div>Login page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/secure" element={<div>Protected page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("renders child routes for authenticated users", () => {
    useAuthMock.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/secure"]}>
        <Routes>
          <Route path="/login" element={<div>Login page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/secure" element={<div>Protected page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected page")).toBeInTheDocument();
  });
});
