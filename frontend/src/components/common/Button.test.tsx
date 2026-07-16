import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders a loading state and disables interaction", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button loading onClick={onClick}>Save</Button>);

    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: /saving/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders children and forwards other props", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick} className="custom">Save</Button>);

    const button = screen.getByRole("button", { name: /save/i });
    await user.click(button);

    expect(button).toHaveClass("custom");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
