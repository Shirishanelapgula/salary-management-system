import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageContainer from "./PageContainer";

describe("PageContainer", () => {
  it("renders the provided children", () => {
    render(
      <PageContainer title="Employees">
        <div>Employee content</div>
      </PageContainer>
    );

    expect(screen.getByText("Employee content")).toBeInTheDocument();
  });
});
