import AIChatMessage from "./AIChatMessage";

interface Message {
    role: "user" | "assistant";
    message: string;
}

interface Props {
    messages: Message[];
    loading: boolean;
}

export default function AIChatWindow({
    messages,
    loading,
}: Props) {
    return (
        <div className={`rounded-xl bg-gray-100 p-6 space-y-4 overflow-y-auto ${
    messages.length
      ? "max-h-[500px]"
      : "min-h-[150px]"
  }`}>

            {messages.length === 0 && !loading && (
                <div className="text-center text-gray-500">
                    Start a conversation with the AI Assistant.
                </div>
            )}

            {messages.map((msg, index) => (
                <AIChatMessage
                    key={index}
                    role={msg.role}
                    message={msg.message}
                />
            ))}

            {loading && (
                <AIChatMessage
                    role="assistant"
                    message="Thinking..."
                />
            )}

        </div>
    );
}