import type { StreamEvent } from "@/types/chat";

export async function* streamPerplexity(question: string) {
  const response = await fetch("/api/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
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

    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const evt of events) {
      if (!evt.startsWith("data:")) continue;

      try {
        const json = JSON.parse(evt.replace("data:", "").trim());
        yield json;
      } catch (e) {
        console.error("SSE parse error:", e, evt);
      }
    }
  }
}
