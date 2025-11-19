export interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  streaming?: boolean;
  isStreaming?: boolean;
  phase?: "search" | "results" | "crawl" | "analyze" | "answer" | null;
  urls?: string[];
  searchingUrls?: string[];
  sources?: Source[];
  answerChunks?: string;
  planSteps?: PlanStep[];
  currentPlan?: string;
}

export interface Source {
  title: string;
  url: string;
  snippet?: string;
  favicon?: string;
}

export interface CrawledUrl {
  url: string;
  title: string;
  favicon: string;
  status?: "crawling" | "completed" | "error";
}

export interface StreamEvent {
  type: "INITIAL_QUERY" | "SEARCH_WEB" | "SEARCH_RESULTS" | "URL_CRAWL_UPDATE" | "THOUGHT_PROCESS_UPDATE" | "FINAL_ANSWER" | "CITATIONS" | "TEXT_CHUNK";
  payload: {
    query?: string;
    queries?: any[];
    web_results?: any[];
    url?: string;
    content?: string;
    text?: string;
    sources?: Source[];
    phase?: string;
    status?: string;
  };
}

export interface PlanStep {
  id: string;
  label: string;
  status: "pending" | "active" | "completed";
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
