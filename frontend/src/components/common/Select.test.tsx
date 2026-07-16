import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Select from "./Select";

describe("Select", () => {
  it("renders the provided options", () => {
    render(
      <Select aria-label="role">
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </Select>
    );

    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /admin/i })).toBeInTheDocument();
  });
});
