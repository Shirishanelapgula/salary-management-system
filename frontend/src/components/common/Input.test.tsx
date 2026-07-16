import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Input from "./Input";

describe("Input", () => {
  it("renders the label and error message", () => {
    render(<Input label="Name" error="Required" aria-label="name" />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
