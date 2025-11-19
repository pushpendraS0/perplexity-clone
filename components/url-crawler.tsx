"use client";

import { Check, Loader2 } from "lucide-react";

interface UrlCrawlerProps {
  urls: string[];
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "Unknown";
  }
}

function getFavicon(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return "/globe.svg";
  }
}

export default function UrlCrawler({ urls }: UrlCrawlerProps) {
  if (!urls.length) return null;

  return (
    <div className="mb-4">
      <div className="text-sm text-gray-600 mb-3">Searching sources...</div>
      <div className="grid grid-cols-1 gap-2">
        {urls.map((url, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <img
              src={getFavicon(url)}
              alt=""
              className="w-4 h-4 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/globe.svg";
              }}
            />
            <span className="text-sm text-gray-700 truncate flex-1">
              {extractDomain(url)}
            </span>
            <div className="flex-shrink-0">
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
