import { render, screen } from "@testing-library/react";
import GlassCard from "./GlassCard";

describe("GlassCard", () => {
  it("renders children correctly", () => {
    render(
      <GlassCard>
        <div>Test Content</div>
      </GlassCard>,
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies base glass class and hover class by default", () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    const card = container.firstChild;
    expect(card).toHaveClass("glass");
    expect(card).toHaveClass("glass-hover");
  });

  it("does not apply hover class when hover prop is false", () => {
    const { container } = render(<GlassCard hover={false}>Content</GlassCard>);
    const card = container.firstChild;
    expect(card).toHaveClass("glass");
    expect(card).not.toHaveClass("glass-hover");
  });

  it("merges custom className", () => {
    const { container } = render(
      <GlassCard className="custom-class">Content</GlassCard>,
    );
    const card = container.firstChild;
    expect(card).toHaveClass("glass");
    expect(card).toHaveClass("custom-class");
  });
});
