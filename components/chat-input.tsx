"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isStreaming: boolean;
}

export default function ChatInput({ onSendMessage, isStreaming }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isStreaming) {
      onSendMessage(input);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-end bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow focus-within:border-blue-300 focus-within:shadow-md">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a follow-up..."
          disabled={isStreaming}
          rows={1}
          className="flex-1 px-5 py-4 text-base outline-none resize-none bg-transparent max-h-[200px] disabled:opacity-50"
        />
        <Button
          type="submit"
          disabled={!input.trim() || isStreaming}
          className="m-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-xl h-10 w-10 p-0 transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Press Enter to send, Shift + Enter for new line
      </p>
    </form>
  );
}
