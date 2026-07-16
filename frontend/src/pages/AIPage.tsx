import { useState } from "react";
import toast from "react-hot-toast";

import PageContainer from "../components/layout/PageContainer";
import AIChatInput from "../components/ai/AIChatInput";
import AIChatWindow from "../components/ai/AIChatWindow";
import AISuggestions from "../components/ai/AISuggestions";

import { useAI } from "../hooks/useAI";
import type { ChatMessage } from "../types/ai.types";

export default function AIPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const ai = useAI();

    async function handleSend(text: string) {
        if (!text.trim()) return;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                message: text,
            },
        ]);

        try {
            const response = await ai.mutateAsync({
                query: text,
            });

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    message: response.data.answer,
                },
            ]);
            toast.success("AI response received successfully");
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    message: "Sorry, something went wrong.",
                },
            ]);
            const message = error?.message
                ? `Unable to process AI request: ${error.message}`
                : "Unable to process AI request";
            toast.error(message);
        }
    }

    return (
        <PageContainer title="AI Assistant">

            <div className="space-y-6">

                <AISuggestions onSelect={handleSend} />

                <AIChatWindow
                    messages={messages}
                    loading={ai.isPending}
                />

                <AIChatInput
                    loading={ai.isPending}
                    onSend={handleSend}
                />

            </div>

        </PageContainer>
    );
}