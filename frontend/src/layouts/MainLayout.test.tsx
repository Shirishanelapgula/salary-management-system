import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("../components/layout/Sidebar", () => ({ default: () => <aside>Sidebar</aside> }));

import MainLayout from "./MainLayout";

describe("MainLayout", () => {
  it("renders the sidebar and outlet content", () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });
});
