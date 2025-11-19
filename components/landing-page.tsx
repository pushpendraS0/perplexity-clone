"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/chat?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const exampleQuestions = [
    "What are the latest developments in AI?",
    "Explain quantum computing in simple terms",
    "Top 10 programming languages in 2024",
    "How does photosynthesis work?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Perplexity
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
              Where knowledge begins
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ask anything and get instant, accurate answers powered by AI.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <Search className="w-5 h-5 text-gray-400 ml-5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-5 text-base outline-none bg-transparent"
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={!query.trim()}
                  className="m-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-12 px-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Search
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>

          {/* Example Questions */}
          <div className="space-y-4 pt-8">
            <p className="text-sm text-gray-500 font-medium">Try asking:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(question)}
                  className="text-left px-5 py-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-sm text-gray-700 hover:text-blue-600 group"
                >
                  <span className="flex items-center justify-between">
                    {question}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-6 text-center text-sm text-gray-500">
        <p>Powered by advanced AI technology</p>
      </footer>
    </div>
  );
}
