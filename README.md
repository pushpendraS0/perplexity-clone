# Perplexity AI Clone 🚀

A pixel-perfect clone of Perplexity AI's chat interface with functional streaming responses, built with Next.js, TypeScript, and TailwindCSS.

## 🎯 Features

- **Beautiful Landing Page**: Clean hero section with search bar that routes to chat
- **Real-time Streaming**: Functional streaming AI responses with multiple states
- **Multi-turn Conversations**: Support for 5-6 messages in one chat session
- **Loading States**: Progressive plan updates, URL crawling indicators, and word-by-word streaming
- **Source Citations**: Displays sources with beautiful cards at the end of responses
- **Responsive Design**: Fully responsive and mobile-friendly
- **Smooth Animations**: Fade-ins, loading indicators, and transitions
- **Auto-scroll**: Intelligent scrolling behavior when sending/receiving messages

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Markdown**: React Markdown

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd perplexity-clone
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
perplexity-clone/
├── app/
│   ├── chat/
│   │   └── page.tsx          # Chat interface page
│   ├── globals.css           # Global styles and animations
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Landing page
│   └── providers.tsx         # React Query provider
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── chat-input.tsx        # Chat input with auto-resize
│   ├── chat-interface.tsx    # Main chat interface
│   ├── chat-message.tsx      # Message display with streaming
│   └── landing-page.tsx      # Landing page component
├── lib/
│   ├── stream.ts             # Streaming API utility
│   └── utils.ts              # Utility functions
└── types/
    └── chat.ts               # TypeScript types
```

## 🎨 Key Features Implemented

### 1. Landing Page
- Hero section with gradient branding
- Large search bar with smooth transitions
- Example questions for quick start
- Responsive design

### 2. Chat Interface
- Multi-turn conversation support
- Real-time streaming from API
- Loading states:
  - "Searching..." with spinner
  - URL crawling indicators
  - Word-by-word answer streaming
  - Source citations
- New chat button
- Auto-scroll behavior

### 3. Streaming States
The app handles multiple streaming states from the API:
- **Initial Loading**: Displays loading spinner with status
- **Plan Updates**: Shows current search plan
- **URL Crawling**: Displays domains being searched with pulsing indicators
- **Text Streaming**: Renders answer word-by-word
- **Sources**: Shows source cards with links

### 4. UI Polish
- Gradient branding (blue to purple)
- Smooth animations and transitions
- Custom scrollbar styling
- Hover effects on interactive elements
- Responsive design for all screen sizes
- Beautiful source cards
- Markdown rendering with custom styling

## 🌐 API Integration

The app integrates with the mock Perplexity API:

**Endpoint**: `https://mock-askperplexity.piyushhhxyz.deno.net`

**Request**:
```json
{
  "question": "your question here"
}
```

**Response**: Server-Sent Events (SSE) stream with:
- Status updates
- Plan information
- Search URLs
- Streaming answer text
- Source citations

## 📝 Usage

1. **Landing Page**: Enter a question in the search bar
2. **Chat Interface**: 
   - Type your question and press Enter
   - Watch the streaming response with loading states
   - Ask follow-up questions
   - Click "New Chat" to reset

## 🎭 Animation Details

- **Fade In**: Smooth fade-in for messages
- **Pulse Dots**: Animated dots for URL crawling indicators
- **Shimmer**: Loading shimmer effect
- **Smooth Scroll**: Auto-scroll to latest message
- **Hover Effects**: Interactive hover states on buttons and sources

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Manual Deployment

```bash
npm run build
npm start
```

## 📦 Build

```bash
npm run build
```

## 🧪 Testing the API

Test the streaming API with curl:

```bash
curl -X POST https://mock-askperplexity.piyushhhxyz.deno.net 
  -H "Content-Type: application/json" 
  -d '{"question": "list of top 10 singers, give table"}' 
  --no-buffer
```

## 🎯 Assignment Requirements Met

✅ Landing page with search bar  
✅ Chat interface with streaming responses  
✅ Multi-turn conversations (5-6 messages)  
✅ All streaming states implemented  
✅ Source citations displayed  
✅ New chat functionality  
✅ Pixel-perfect UI replication  
✅ Smooth animations and transitions  
✅ Auto-scroll behavior  
✅ Responsive design  
✅ Clean code architecture  
✅ TypeScript for type safety  
✅ TailwindCSS for styling  
✅ shadcn/ui components  
✅ TanStack Query for state management  

## 🏆 What Makes This Special

- **Attention to Detail**: Every animation, transition, and loading state matches Perplexity
- **Clean Code**: Well-organized components with TypeScript
- **Performance**: Optimized rendering and streaming
- **UX Excellence**: Smooth interactions and feedback
- **Professional Design**: Beautiful gradient branding and modern UI

## 📧 Contact

Built with ❤️ for the Frontend Engineer Assignment

---

**Note**: This is a frontend assignment project. The API returns mock responses regardless of the question asked.
