import { useState } from "react";

interface Props {
  loading: boolean;
  onSend(message: string): void;
}

export default function AIChatInput({
  loading,
  onSend,
}: Props) {
  const [message, setMessage] = useState("");

  const send = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="mt-4 flex w-full gap-3">

      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        placeholder="Ask anything about employees, payroll, salaries..."
        value={message}
        disabled={loading}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
      />

      <button
        type="button"
        onClick={send}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "..." : "Send"}
      </button>

    </div>
  );
}