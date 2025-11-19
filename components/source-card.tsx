"use client";

import { Source } from "@/types/chat";
import { ExternalLink } from "lucide-react";

interface SourceCardProps {
  source: Source;
  index: number;
}

export default function SourceCard({ source, index }: SourceCardProps) {
  const handleClick = () => {
    window.open(source.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      className="p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start space-x-3">
        <img
          src={source.favicon || `/globe.svg`}
          alt=""
          className="w-4 h-4 flex-shrink-0 mt-1"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/globe.svg";
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {source.title}
            </h4>
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              <span className="text-xs text-gray-500">{index}</span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
          {source.snippet && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {source.snippet}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1 truncate">
            {new URL(source.url).hostname}
          </p>
        </div>
      </div>
    </div>
  );
}
