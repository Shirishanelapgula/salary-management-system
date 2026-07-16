import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "./Card";

describe("Card", () => {
  it("renders children inside the card container", () => {
    render(<Card><div>Content</div></Card>);

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
