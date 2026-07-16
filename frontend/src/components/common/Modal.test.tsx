import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders content and closes on button click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open title="Edit User" onClose={onClose}>
        <div>Modal body</div>
      </Modal>
    );

    expect(screen.getByText("Edit User")).toBeInTheDocument();
    expect(screen.getByText("Modal body")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
