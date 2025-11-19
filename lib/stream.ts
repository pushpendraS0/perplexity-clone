import type { StreamEvent } from "@/types/chat";

export async function* streamPerplexity(question: string): AsyncGenerator<StreamEvent, void, unknown> {
  try {
    const response = await fetch("https://mock-askperplexity.piyushhhxyz.deno.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim() === "" || line.startsWith("event:")) {
          continue;
        }
        
        if (line.startsWith("data:")) {
          try {
            const jsonStr = line.slice(5).trim();
            if (jsonStr && jsonStr !== "[DONE]") {
              const rawData = JSON.parse(jsonStr);
              
              // Handle FINAL step specially for text streaming
              if (rawData.step_type === "FINAL") {
                yield* handleFinalStep(rawData);
              } else {
                const normalizedEvent = normalizeStreamEvent(rawData);
                if (normalizedEvent) {
                  yield normalizedEvent;
                }
              }
            }
          } catch (e) {
            console.error("Error parsing SSE data:", e, "Line:", line);
          }
        }
      }
    }
  } catch (error) {
    console.error("Stream error:", error);
    yield {
      type: "FINAL_ANSWER",
      payload: {
        content: "Sorry, I encountered an error processing your request. Please try again."
      }
    };
  }
}

async function* handleFinalStep(rawData: any): AsyncGenerator<StreamEvent, void, unknown> {
  try {
    let content = "";
    let sources: any[] = [];

    if (rawData.content?.answer) {
      const answerData = JSON.parse(rawData.content.answer);
      content = answerData.answer || "";
      sources = answerData.web_results || [];
    }

    // Emit thought process update
    yield {
      type: "THOUGHT_PROCESS_UPDATE",
      payload: {}
    };

    // Split content into chunks for word-by-word streaming
    const words = content.split(' ');
    
    for (let i = 0; i < words.length; i += 2) {
      const chunk = words.slice(i, i + 2).join(' ') + ' ';
      yield {
        type: "TEXT_CHUNK",
        payload: {
          text: chunk
        }
      };
      
      // Small delay to simulate real streaming
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Emit final answer
    yield {
      type: "FINAL_ANSWER",
      payload: {
        content: content
      }
    };

    // Emit sources if available
    if (sources.length > 0) {
      yield {
        type: "CITATIONS",
        payload: {
          sources: sources.map((source: any) => ({
            title: source.name || source.title || "Untitled",
            url: source.url || "#",
            snippet: source.snippet || "",
            favicon: `https://www.google.com/s2/favicons?domain=${extractDomain(source.url)}&sz=32`
          }))
        }
      };
    }
  } catch (e) {
    yield {
      type: "FINAL_ANSWER",
      payload: {
        content: "Response generated successfully."
      }
    };
  }
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "example.com";
  }
}

function normalizeStreamEvent(rawData: any): StreamEvent | null {
  if (!rawData.step_type) return null;

  switch (rawData.step_type) {
    case "INITIAL_QUERY":
      return {
        type: "INITIAL_QUERY",
        payload: {
          query: rawData.content?.query || ""
        }
      };

    case "SEARCH_WEB":
      return {
        type: "SEARCH_WEB",
        payload: {
          queries: rawData.content?.queries || []
        }
      };

    case "SEARCH_RESULTS":
      return {
        type: "SEARCH_RESULTS",
        payload: {
          web_results: rawData.content?.web_results || []
        }
      };

    default:
      return null;
  }
}
