export interface StreamEvent {
  step_type?: string;
  content?: any;
  backend_uuid?: string;
  context_uuid?: string;
  uuid?: string;
  frontend_context_uuid?: string;
  search_focus?: string;
  mode?: string;
  answer?: string;
  status?: string;
  query_str?: string;
  queries?: Array<{
    engine: string;
    query: string;
    limit?: number;
  }>;
  search_info?: Array<{
    url: string;
    title: string;
  }>;
  text?: string;
  sources?: Source[];
  plan?: string;
  web_results?: Array<{
    name: string;
    url: string;
  }>;
}

export interface PlanStep {
  step: number;
  description: string;
}

export interface Source {
  title: string;
  url: string;
  favicon?: string;
  snippet?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  isStreaming?: boolean;
  plan?: PlanStep[];
  currentPlan?: string;
  searchingUrls?: string[];
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
