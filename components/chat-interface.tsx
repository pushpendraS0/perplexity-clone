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
        console.log("Received event:", event);

        setMessages((prevMessages) =>
          prevMessages.map((msg) => {
            if (msg.id !== assistantMessage.id) return msg;

            const updatedMessage = { ...msg };

            switch (event.type) {
              case "INITIAL_QUERY":
                updatedMessage.phase = "search";
                updatedMessage.planSteps = updatedMessage.planSteps?.map(step =>
                  step.id === "search" 
                    ? { ...step, status: "active" as const }
                    : step
                ) || [];
                break;

              case "SEARCH_WEB":
                updatedMessage.phase = "results";
                updatedMessage.planSteps = updatedMessage.planSteps?.map(step => {
                  if (step.id === "search") return { ...step, status: "completed" as const };
                  if (step.id === "results") return { ...step, status: "active" as const };
                  return step;
                }) || [];
                break;

              case "SEARCH_RESULTS":
                updatedMessage.phase = "crawl";
                updatedMessage.planSteps = updatedMessage.planSteps?.map(step => {
                  if (step.id === "results") return { ...step, status: "completed" as const };
                  if (step.id === "crawl") return { ...step, status: "active" as const };
                  return step;
                }) || [];
                
                // Add URLs from search results
                if (event.payload.web_results) {
                  updatedMessage.urls = event.payload.web_results.map((result: any) => result.url);
                }
                break;

              case "URL_CRAWL_UPDATE":
                if (event.payload.url && !updatedMessage.urls?.includes(event.payload.url)) {
                  updatedMessage.urls = [...(updatedMessage.urls || []), event.payload.url];
                }
                break;

              case "THOUGHT_PROCESS_UPDATE":
                updatedMessage.phase = "analyze";
                updatedMessage.planSteps = updatedMessage.planSteps?.map(step => {
                  if (step.id === "crawl") return { ...step, status: "completed" as const };
                  if (step.id === "analyze") return { ...step, status: "active" as const };
                  return step;
                }) || [];
                break;

              case "TEXT_CHUNK":
                updatedMessage.phase = "answer";
                updatedMessage.planSteps = updatedMessage.planSteps?.map(step => {
                  if (step.id === "analyze") return { ...step, status: "completed" as const };
                  if (step.id === "answer") return { ...step, status: "active" as const };
                  return step;
                }) || [];
                
                // Append text chunk to content
                if (event.payload.text) {
                  updatedMessage.answerChunks = (updatedMessage.answerChunks || "") + event.payload.text;
                  updatedMessage.content = updatedMessage.answerChunks;
                }
                break;

              case "FINAL_ANSWER":
                updatedMessage.streaming = false;
                updatedMessage.phase = null;
                updatedMessage.planSteps = updatedMessage.planSteps?.map(step => 
                  ({ ...step, status: "completed" as const })
                ) || [];
                
                if (event.payload.content) {
                  updatedMessage.content = event.payload.content;
                }
                break;

              case "CITATIONS":
                if (event.payload.sources) {
                  updatedMessage.sources = event.payload.sources;
                }
                break;
            }

            return updatedMessage;
          })
        );

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
