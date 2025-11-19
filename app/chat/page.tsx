import { Suspense } from "react";
import ChatInterface from "@/components/chat-interface";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

function ChatInterfaceWrapper() {
  return <ChatInterface />;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">Loading chat...</div>
    </div>}>
      <ChatInterfaceWrapper />
    </Suspense>
  );
}
