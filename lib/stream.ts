import type { StreamEvent } from "@/types/chat";

export async function* streamPerplexity(question: string) {
  const response = await fetch("https://mock-askperplexity.piyushhhxyz.deno.net", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

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
          if (jsonStr) {
            const data: StreamEvent = JSON.parse(jsonStr);
            
            // Yield the data as-is, preserving the step_type and content structure
            yield data;
          }
        } catch (e) {
          console.error("Error parsing SSE data:", e, "Line:", line);
        }
      }
    }
  }
}
