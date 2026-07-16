import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AIChatInput from "./AIChatInput";

describe("AIChatInput", () => {
  it("sends the entered message", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();

    render(<AIChatInput loading={false} onSend={onSend} />);

    const input = screen.getByPlaceholderText(/ask anything about employees/i);
    await user.type(input, "Show me payroll");
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(onSend).toHaveBeenCalledWith("Show me payroll");
  });

  it("does not send empty messages", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();

    render(<AIChatInput loading={false} onSend={onSend} />);

    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(onSend).not.toHaveBeenCalled();
  });

  it("shows a loading state", () => {
    render(<AIChatInput loading={true} onSend={vi.fn()} />);

    expect(screen.getByRole("button", { name: /\.{3}/i })).toBeDisabled();
    expect(screen.getByPlaceholderText(/ask anything about employees/i)).toBeDisabled();
  });
});
