import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmployeeState from "./EmployeeState";

describe("EmployeeState", () => {
  it("renders the title and description", () => {
    render(<EmployeeState title="No employees" description="Add one to get started" />);

    expect(screen.getByText("No employees")).toBeInTheDocument();
    expect(screen.getByText("Add one to get started")).toBeInTheDocument();
  });
});
