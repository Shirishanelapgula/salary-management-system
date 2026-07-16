import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const { useAIMock, toastSuccessMock, toastErrorMock } = vi.hoisted(() => ({
  useAIMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
}));

vi.mock("../hooks/useAI", () => ({ useAI: () => useAIMock() }));
vi.mock("react-hot-toast", () => ({ default: { success: toastSuccessMock, error: toastErrorMock } }));
vi.mock("../components/layout/PageContainer", () => ({ default: ({ title, children }: { title: string; children: React.ReactNode }) => <div><h1>{title}</h1>{children}</div> }));
vi.mock("../components/ai/AIChatInput", () => ({ default: ({ onSend, loading }: { onSend: (text: string) => void; loading: boolean }) => <button onClick={() => onSend("hello")}>{loading ? "Loading" : "Send"}</button> }));
vi.mock("../components/ai/AIChatWindow", () => ({ default: ({ messages }: { messages: Array<{ role: string; message: string }> }) => <div>{messages.map((m) => <p key={`${m.role}-${m.message}`}>{m.message}</p>)}</div> }));
vi.mock("../components/ai/AISuggestions", () => ({ default: ({ onSelect }: { onSelect: (text: string) => void }) => <button onClick={() => onSelect("suggestion")}>Suggestion</button> }));

import AIPage from "./AIPage";

describe("AIPage", () => {
  it("renders the chat UI and handles a successful response", async () => {
    const user = userEvent.setup();
    useAIMock.mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({ data: { answer: "Hello" } }), isPending: false });

    render(<AIPage />);

    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(toastSuccessMock).toHaveBeenCalled();
  });

  it("shows a friendly error message when the AI request fails", async () => {
    const user = userEvent.setup();
    useAIMock.mockReturnValue({ mutateAsync: vi.fn().mockRejectedValue(new Error("boom")), isPending: false });

    render(<AIPage />);

    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByText("Sorry, something went wrong.")).toBeInTheDocument();
    expect(toastErrorMock).toHaveBeenCalled();
  });
});
