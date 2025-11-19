"use client";

import { Message } from "@/types/chat";
import { User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import PlanProgress from "./plan-progress";
import UrlCrawler from "./url-crawler";
import SourceCard from "./source-card";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  if (message.type === "user") {
    return (
      <div className="flex justify-end animate-fadeIn">
        <div className="flex items-start space-x-3 max-w-[80%]">
          <div className="bg-blue-600 text-white rounded-lg px-4 py-3 shadow-sm">
            <p className="text-sm">{message.content}</p>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="flex items-start space-x-3 max-w-full w-full">
        {/* AI Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
            
            {/* Plan Progress */}
            {message.streaming && message.planSteps && (
              <div className="mb-4">
                <PlanProgress steps={message.planSteps} />
              </div>
            )}

            {/* URL Crawler */}
            {message.urls && message.urls.length > 0 && message.phase === "crawl" && (
              <div className="mb-4">
                <UrlCrawler urls={message.urls} />
              </div>
            )}

            {/* Thought Process */}
            {message.streaming && message.phase === "analyze" && (
              <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span>Analyzing results and generating response...</span>
              </div>
            )}

            {/* Answer Content */}
            {message.content && (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-3 text-gray-800 leading-relaxed">{children}</p>,
                    h1: ({ children }) => <h1 className="text-xl font-semibold mb-3 text-gray-900">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-lg font-semibold mb-3 text-gray-900">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-base font-semibold mb-2 text-gray-900">{children}</h3>,
                    ul: ({ children }) => <ul className="mb-3 pl-6 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-3 pl-6 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-800">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                    code: ({ children }) => (
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto mb-3">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-3">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}

            {/* Streaming Indicator */}
            {message.streaming && message.phase === "answer" && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-75"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-150"></div>
                </div>
              </div>
            )}

            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Sources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {message.sources.map((source, index) => (
                    <SourceCard key={index} source={source} index={index + 1} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
