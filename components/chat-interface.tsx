"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Message, StreamEvent } from "@/types/chat";
import { streamPerplexity } from "@/lib/stream";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";
import { Button } from "./ui/button";
import { MessageSquare, Plus } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial query from URL params
  useEffect(() => {
    const query = searchParams.get("q");
    if (query && messages.length === 0) {
      handleSendMessage(query);
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    setIsStreaming(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    // Add initial assistant message
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: "",
      timestamp: new Date(),
      streaming: true,
      phase: "search",
      planSteps: [
        { id: "search", label: "Searching", status: "active" },
        { id: "results", label: "Finding results", status: "pending" },
        { id: "crawl", label: "Crawling sources", status: "pending" },
        { id: "analyze", label: "Analyzing", status: "pending" },
        { id: "answer", label: "Generating answer", status: "pending" },
      ],
      urls: [],
      sources: [],
      answerChunks: "",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    try {
      for await (const event of streamPerplexity(content)) {
        console.log("EVENT:", event);

        if (event.step_type === "INITIAL_QUERY") {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantMessage.id
                ? { ...m, currentPlan: "Searching..." }
                : m
            )
          );
        }

        if (event.step_type === "SEARCH_WEB") {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantMessage.id
                ? { ...m, currentPlan: "Finding results..." }
                : m
            )
          );
        }

        if (event.step_type === "SEARCH_RESULTS") {
          const urls = event.content.web_results.map((r: any) => {
            try { return new URL(r.url).hostname.replace("www.", ""); }
            catch { return r.name; }
          });

          setMessages(prev =>
            prev.map(m =>
              m.id === assistantMessage.id
                ? { ...m, searchingUrls: urls.slice(0, 5), currentPlan: "Crawling sources..." }
                : m
            )
          );
        }

        if (event.type === "TEXT_CHUNK") {
          const text = event.payload.text;
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantMessage.id
                ? { ...m, content: (m.content || "") + text, currentPlan: "Generating answer..." }
                : m
            )
          );
        }

        if (event.step_type === "FINAL") {
          const answer = event.content.answer;
          const sources = event.content.web_results;

          setMessages(prev =>
            prev.map(m =>
              m.id === assistantMessage.id
                ? {
                    ...m,
                    content: answer,
                    sources,
                    isStreaming: false,
                    currentPlan: undefined,
                    searchingUrls: undefined
                  }
                : m
            )
          );

          break;
        }

        // Auto-scroll on each chunk
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.error("Error streaming response:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? {
                ...msg,
                content: "Sorry, I encountered an error. Please try again.",
                streaming: false,
                phase: null,
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    router.push("/chat");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Perplexity</span>
        </div>
        <Button
          onClick={handleNewChat}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isStreaming={isStreaming}
          />
        </div>
      </div>
    </div>
  );
}
