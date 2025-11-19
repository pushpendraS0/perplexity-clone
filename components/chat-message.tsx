"use client";

import { Message } from "@/types/chat";
import { User, Sparkles, ExternalLink, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === "user") {
    return (
      <div className="flex gap-4 animate-fade-in">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-1 pt-1">
          <p className="text-gray-900 text-base leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 space-y-4">
        {/* Loading/Plan State */}
        {message.isStreaming && message.currentPlan && (
          <div className="flex items-center gap-2 text-sm text-gray-600 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{message.currentPlan}</span>
          </div>
        )}

        {/* Searching URLs */}
        {message.isStreaming && message.searchingUrls && message.searchingUrls.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Searching sources...</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {message.searchingUrls.slice(0, 5).map((url, index) => {
                const domain = new URL(url).hostname.replace("www.", "");
                return (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium flex items-center gap-1.5 animate-pulse"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse-dot" style={{ animationDelay: `${index * 0.2}s` }} />
                    {domain}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Answer Content */}
        {message.content && (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }: any) => (
                  <p className="text-gray-900 leading-relaxed mb-4">{children}</p>
                ),
                h1: ({ children }: any) => (
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>
                ),
                h2: ({ children }: any) => (
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{children}</h2>
                ),
                h3: ({ children }: any) => (
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{children}</h3>
                ),
                ul: ({ children }: any) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-gray-900">
                    {children}
                  </ul>
                ),
                ol: ({ children }: any) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-900">
                    {children}
                  </ol>
                ),
                li: ({ children }: any) => <li className="text-gray-900">{children}</li>,
                table: ({ children }: any) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }: any) => (
                  <thead className="bg-gray-50">{children}</thead>
                ),
                tbody: ({ children }: any) => (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {children}
                  </tbody>
                ),
                tr: ({ children }: any) => <tr>{children}</tr>,
                th: ({ children }: any) => (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }: any) => (
                  <td className="px-4 py-3 text-sm text-gray-900">{children}</td>
                ),
                code: ({ inline, children }: any) => {
                  if (inline) {
                    return (
                      <code className="px-1.5 py-0.5 bg-gray-100 text-gray-900 rounded text-sm font-mono">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="block p-4 bg-gray-100 text-gray-900 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                      {children}
                    </code>
                  );
                },
                strong: ({ children }: any) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
                em: ({ children }: any) => (
                  <em className="italic text-gray-900">{children}</em>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {/* Streaming Cursor */}
        {message.isStreaming && message.content && (
          <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-1" />
        )}

        {/* Sources */}
        {!message.isStreaming && message.sources && message.sources.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-700">Sources:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {message.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-medium text-gray-600 border border-gray-200">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {source.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {new URL(source.url).hostname.replace("www.", "")}
                    </p>
                  </div>
                  <ExternalLink className="flex-shrink-0 w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
