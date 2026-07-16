interface Props {
  role: "user" | "assistant";
  message: string;
}

export default function AIChatMessage({
  role,
  message,
}: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-2xl rounded-xl px-5 py-3 shadow

        ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}