import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AISuggestions from "./AISuggestions";

describe("AISuggestions", () => {
  it("renders the available AI prompts", () => {
    render(<AISuggestions onSelect={vi.fn()} />);

    expect(screen.getByRole("button", { name: /show highest paid employees/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /total payroll/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /department salary report/i })).toBeInTheDocument();
  });

  it("calls onSelect with the clicked suggestion", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<AISuggestions onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: /lowest paid employees/i }));

    expect(onSelect).toHaveBeenCalledWith("Lowest paid employees");
  });
});
