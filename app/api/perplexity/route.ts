import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Create a ReadableStream for Server-Sent Events
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        
        // Send data in SSE format
        const sendSSE = (data: any) => {
          const formattedData = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(formattedData));
        };

        // Simulate the streaming response from Perplexity API
        const simulateResponse = async () => {
          // Step 1: Initial query
          sendSSE({
            step_type: "INITIAL_QUERY",
            content: { query },
            uuid: ""
          });

          await new Promise(resolve => setTimeout(resolve, 500));

          // Step 2: Search web
          sendSSE({
            step_type: "SEARCH_WEB",
            content: {
              goal_id: "0",
              queries: [
                { engine: "web", query: query, limit: 8 }
              ]
            },
            uuid: "search-uuid-123"
          });

          await new Promise(resolve => setTimeout(resolve, 1000));

          // Step 3: Search results
          sendSSE({
            step_type: "SEARCH_RESULTS",
            content: {
              goal_id: "0",
              web_results: [
                {
                  name: "Example Source 1",
                  url: "https://example.com/1",
                  snippet: "Relevant information about " + query,
                  meta_data: { domain_name: "example.com" }
                },
                {
                  name: "Example Source 2", 
                  url: "https://wikipedia.org/wiki/" + encodeURIComponent(query),
                  snippet: "Wikipedia information about " + query,
                  meta_data: { domain_name: "wikipedia.org" }
                }
              ]
            },
            uuid: "results-uuid-456"
          });

          await new Promise(resolve => setTimeout(resolve, 1000));

          // Step 4: Final response
          const answer = `Here's information about ${query}:

This is a comprehensive answer about your query. Based on the search results, I can provide you with relevant information that addresses your question.

Key points:
- Point 1 about ${query}
- Point 2 with additional details
- Point 3 providing context

This response demonstrates the streaming capabilities of the Perplexity AI clone.`;

          const finalResponse = {
            answer: JSON.stringify({
              answer: answer,
              web_results: [
                {
                  name: "Example Source 1",
                  url: "https://example.com/1",
                  snippet: "Relevant information"
                },
                {
                  name: "Example Source 2",
                  url: "https://wikipedia.org/wiki/" + encodeURIComponent(query),
                  snippet: "Wikipedia information"
                }
              ]
            })
          };

          sendSSE({
            step_type: "FINAL",
            content: finalResponse,
            uuid: ""
          });

          // Close the stream
          controller.close();
        };

        simulateResponse().catch((error) => {
          console.error("Streaming error:", error);
          controller.close();
        });
      }
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
