"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Message } from "@/types/chat";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";
import { streamPerplexity } from "@/lib/stream";
import { Sparkles, Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams?.get("q");
  const hasProcessedInitialQuery = useRef(false);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (initialQuery && !hasProcessedInitialQuery.current) {
      hasProcessedInitialQuery.current = true;
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    setMessages([]);
    hasProcessedInitialQuery.current = false;
    router.push("/");
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      isStreaming: true,
      sources: [],
      plan: [],
      searchingUrls: [],
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsStreaming(true);

    // Scroll to show the new user message
    setTimeout(() => scrollToBottom("instant"), 100);

    try {
      let fullAnswer = "";
      let sources: Array<{ title: string; url: string }> = [];
      let planSteps: string[] = [];
      let searchUrls: string[] = [];

      for await (const event of streamPerplexity(content)) {
        console.log("Received event:", event); // Debug log

        // Handle different step types
        if (event.step_type === "INITIAL_QUERY") {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, currentPlan: "Processing your query..." }
                : msg
            )
          );
        }

        if (event.step_type === "SEARCH_WEB") {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, currentPlan: "Searching the web..." }
                : msg
            )
          );
          
          // Extract URLs from queries in content
          if (event.content?.queries && Array.isArray(event.content.queries)) {
            const urls = event.content.queries
              .filter((q: any) => q.engine === "web")
              .map((q: any) => q.engine + ".search");
            if (urls.length > 0) {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessage.id
                    ? { ...msg, searchingUrls: ["web.search", "google.com", "bing.com"] }
                    : msg
                )
              );
            }
          }
        }

        if (event.step_type === "SEARCH_RESULTS") {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, currentPlan: "Analyzing search results..." }
                : msg
            )
          );

          // Extract web results URLs from content
          if (event.content?.web_results && Array.isArray(event.content.web_results)) {
            const urls: string[] = event.content.web_results.map((result: any) => {
              try {
                return new URL(result.url).hostname.replace("www.", "");
              } catch {
                return result.name || "source";
              }
            }).filter((url: any) => typeof url === 'string' && url.length > 0);
            searchUrls = [...new Set(urls)];
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessage.id
                  ? { ...msg, searchingUrls: searchUrls.slice(0, 5) }
                  : msg
              )
            );
          }
        }

        if (event.step_type === "FINAL") {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, currentPlan: "Generating response..." }
                : msg
            )
          );

          // Extract the answer from content
          if (event.content?.answer) {
            try {
              const answerData = JSON.parse(event.content.answer);
              if (answerData.answer) {
                fullAnswer = answerData.answer;
              }
              
              // Extract sources
              if (answerData.web_results && Array.isArray(answerData.web_results)) {
                sources = answerData.web_results.slice(0, 6).map((result: any) => ({
                  title: result.name || result.snippet || "Source",
                  url: result.url || "#"
                }));
              }
            } catch (e) {
              // If JSON parsing fails, use the content directly
              fullAnswer = event.content.answer;
            }
          }

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: fullAnswer }
                : msg
            )
          );
        }

        // Legacy handlers for backward compatibility
        if (event.status) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, currentPlan: event.status }
                : msg
            )
          );
        }

        if (event.answer) {
          fullAnswer = event.answer;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: fullAnswer }
                : msg
            )
          );
        }

        if (event.text) {
          fullAnswer += event.text;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: fullAnswer }
                : msg
            )
          );
        }

        if (event.sources && event.sources.length > 0) {
          sources = event.sources;
        }
      }

      // Finalize the message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? {
                ...msg,
                content: fullAnswer || "No response generated.",
                sources,
                isStreaming: false,
                currentPlan: undefined,
                searchingUrls: undefined,
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error streaming response:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? {
                ...msg,
                content: "Sorry, I encountered an error. Please try again.",
                isStreaming: false,
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perplexity
            </span>
          </div>
          <Button
            onClick={handleNewChat}
            variant="outline"
            className="flex items-center gap-2 h-9 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                How can I help you today?
              </h2>
              <p className="text-gray-500 max-w-md">
                Ask me anything and I'll provide detailed answers with sources.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <ChatInput onSendMessage={handleSendMessage} isStreaming={isStreaming} />
        </div>
      </div>
    </div>
  );
}
