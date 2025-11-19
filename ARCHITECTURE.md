# Code Architecture Guide 🏗️

## Project Overview

This is a Next.js 14 application using the App Router, TypeScript, and TailwindCSS to create a pixel-perfect clone of Perplexity AI's chat interface.

## Directory Structure

```
perplexity-clone/
├── app/                      # Next.js App Router
│   ├── chat/                 # Chat page route
│   │   └── page.tsx         # Chat interface route
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Landing page route
│   └── providers.tsx        # React Query provider
│
├── components/              # React components
│   ├── ui/                  # shadcn/ui base components
│   │   ├── button.tsx      # Button component
│   │   ├── input.tsx       # Input component
│   │   └── textarea.tsx    # Textarea component
│   ├── chat-input.tsx      # Chat input with auto-resize
│   ├── chat-interface.tsx  # Main chat logic
│   ├── chat-message.tsx    # Message display
│   └── landing-page.tsx    # Landing page component
│
├── lib/                     # Utility functions
│   ├── stream.ts           # SSE streaming utility
│   └── utils.ts            # Helper functions (cn)
│
├── types/                   # TypeScript types
│   └── chat.ts             # Chat-related types
│
├── public/                  # Static assets
│
├── Documentation files
├── README.md               # Main documentation
├── DEPLOYMENT.md          # Deployment guide
├── FEATURES.md            # Feature documentation
└── TESTING.md             # Testing checklist
```

## Core Components Deep Dive

### 1. Landing Page (`components/landing-page.tsx`)

**Purpose**: Entry point with search functionality

**State**:
- `query`: Current search input value

**Key Functions**:
- `handleSearch()`: Navigates to chat with query parameter
- Uses Next.js `useRouter` for navigation

**Features**:
- Auto-focused search input
- Example questions that populate search
- Gradient branding
- Responsive layout

**Styling Notes**:
- Uses gradient from blue-600 to purple-600
- Fade-in animation on mount
- Hover effects on cards and buttons

---

### 2. Chat Interface (`components/chat-interface.tsx`)

**Purpose**: Main chat logic and state management

**State**:
- `messages`: Array of Message objects
- `isStreaming`: Boolean for streaming status

**Refs**:
- `messagesEndRef`: For auto-scrolling
- `hasProcessedInitialQuery`: Prevents duplicate initial query

**Key Functions**:

#### `handleSendMessage(content: string)`
1. Creates user message
2. Creates assistant message with loading state
3. Starts streaming from API
4. Updates assistant message as events arrive
5. Finalizes message with sources

#### `scrollToBottom(behavior)`
- Scrolls to latest message
- Uses `scrollIntoView` API

#### `handleNewChat()`
- Resets messages
- Navigates to home page

**Effects**:
- Processes initial query from URL on mount
- Auto-scrolls on message updates

**Streaming Flow**:
```
User sends message
  ↓
Add user message to state
  ↓
Create assistant message (loading)
  ↓
Start streaming
  ↓
For each event:
  - Update status/plan
  - Update searching URLs
  - Append answer text
  - Collect sources
  ↓
Finalize message
  ↓
Set streaming to false
```

---

### 3. Chat Message (`components/chat-message.tsx`)

**Purpose**: Render individual messages with streaming states

**Props**:
- `message`: Message object with role, content, etc.

**Rendering Logic**:

#### User Message
- Shows user icon
- Simple text display
- Fade-in animation

#### Assistant Message
Shows different content based on state:

1. **Loading State** (`isStreaming && currentPlan`)
   - Spinner icon
   - Status text

2. **Searching URLs** (`isStreaming && searchingUrls`)
   - Domain pills
   - Pulsing dot animations
   - Limited to 5 URLs

3. **Answer Content** (`content`)
   - Markdown rendering
   - Custom component mapping
   - Proper typography

4. **Streaming Cursor** (`isStreaming && content`)
   - Blinking cursor effect

5. **Sources** (`!isStreaming && sources`)
   - Grid layout
   - Numbered cards
   - External links

**Markdown Components**:
Custom renderers for:
- Paragraphs (`p`)
- Headings (`h1`, `h2`, `h3`)
- Lists (`ul`, `ol`, `li`)
- Tables (`table`, `thead`, `tbody`, `tr`, `th`, `td`)
- Code (`code` - inline and block)
- Emphasis (`strong`, `em`)

---

### 4. Chat Input (`components/chat-input.tsx`)

**Purpose**: Message input with auto-resize

**State**:
- `input`: Current input value

**Props**:
- `onSendMessage`: Callback to send message
- `isStreaming`: Disable input during streaming

**Refs**:
- `textareaRef`: For height manipulation

**Key Functions**:

#### `handleSubmit(e)`
- Prevents default
- Validates input
- Calls onSendMessage
- Clears input
- Resets textarea height

#### `handleKeyDown(e)`
- Enter: Submit
- Shift+Enter: New line

**Auto-resize Logic**:
```javascript
useEffect(() => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}, [input]);
```

---

### 5. Streaming Utility (`lib/stream.ts`)

**Purpose**: Handle SSE stream from API

**Function**: `streamPerplexity(question: string)`

**Returns**: Async generator yielding StreamEvent objects

**Flow**:
1. Fetch API with POST request
2. Get readable stream
3. Create text decoder
4. Read chunks in loop
5. Parse SSE format
6. Yield parsed events

**SSE Format**:
```
event: message
data: {"key": "value"}

event: message
data: {"key": "value"}
```

**Error Handling**:
- Catches parse errors
- Logs to console
- Continues streaming

---

## Data Flow

### Landing Page → Chat
```
User enters question
  ↓
Click search or press Enter
  ↓
Navigate to /chat?q={question}
  ↓
Chat page loads
  ↓
useEffect reads query param
  ↓
handleSendMessage(query)
```

### Sending a Message
```
User types in input
  ↓
Press Enter
  ↓
handleSubmit
  ↓
onSendMessage callback
  ↓
Chat Interface handleSendMessage
  ↓
Create messages
  ↓
Start streaming
  ↓
Update UI with events
```

### Streaming Events
```
API returns SSE stream
  ↓
stream.ts parses events
  ↓
Generator yields events
  ↓
Chat Interface loops over events
  ↓
Updates message state
  ↓
React re-renders
  ↓
Chat Message displays updates
```

---

## Type System

### Message Type
```typescript
interface Message {
  id: string;              // Unique identifier
  role: "user" | "assistant";
  content: string;         // Message text
  sources?: Source[];      // Citations
  isStreaming?: boolean;   // Currently streaming
  currentPlan?: string;    // Current status
  searchingUrls?: string[]; // URLs being searched
}
```

### StreamEvent Type
```typescript
interface StreamEvent {
  backend_uuid?: string;
  context_uuid?: string;
  uuid?: string;
  answer?: string;         // Full answer
  status?: string;         // Status update
  query_str?: string;      // Original query
  search_info?: Array<{    // URLs being searched
    url: string;
    title: string;
  }>;
  text?: string;           // Streaming text chunk
  sources?: Source[];      // Final sources
  plan?: string;           // Plan update
  web_results?: Array<{    // Search results
    name: string;
    url: string;
  }>;
}
```

---

## Styling System

### TailwindCSS Configuration
- Custom color variables in CSS
- Gradient utilities
- Custom animations
- Responsive breakpoints

### Color Palette
- **Primary**: Blue-600 to Purple-600 gradient
- **Text**: Gray-900 (dark), Gray-600 (medium), Gray-500 (light)
- **Background**: White, Gray-50, Gray-100
- **Borders**: Gray-200

### Custom Animations
```css
@keyframes fadeIn { /* 0.3s ease-out */ }
@keyframes pulse-dot { /* 1.4s ease-in-out */ }
@keyframes shimmer { /* 2s linear */ }
```

---

## State Management

### React Query Setup
```typescript
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})
```

**Current Usage**: Provider wrapper only (no queries yet)

**Potential Use**: Could be used for chat history, user preferences, etc.

---

## Performance Optimizations

### 1. Auto-scrolling
- Only scrolls if new message
- Smooth vs instant based on context
- Uses `scrollIntoView` API

### 2. Message Updates
- Updates specific message by ID
- Doesn't re-render all messages
- Efficient state updates

### 3. Streaming
- Yields events incrementally
- Doesn't buffer entire response
- Memory efficient

### 4. Component Structure
- Small, focused components
- Minimal prop drilling
- Clear separation of concerns

---

## Error Handling

### Network Errors
```typescript
try {
  // streaming logic
} catch (error) {
  console.error("Error streaming response:", error);
  // Show error message
}
```

### Parse Errors
```typescript
try {
  const data = JSON.parse(jsonStr);
  yield data;
} catch (e) {
  console.error("Error parsing SSE data:", e);
  // Continue streaming
}
```

### User Input Validation
```typescript
if (!content.trim() || isStreaming) return;
```

---

## Best Practices Followed

### React
✅ Hooks for state and effects  
✅ Refs for DOM manipulation  
✅ Proper dependency arrays  
✅ Event handler naming (handleX)  
✅ Conditional rendering  

### TypeScript
✅ Interface definitions  
✅ Type annotations  
✅ Generic types  
✅ Type guards  
✅ Minimal `any` usage  

### Next.js
✅ App Router  
✅ Client components when needed  
✅ Server components by default  
✅ useRouter for navigation  
✅ URL params for state  

### CSS
✅ Utility-first with Tailwind  
✅ Mobile-first responsive  
✅ Custom animations  
✅ Consistent spacing  
✅ Semantic class names  

---

## Testing Approach

### Manual Testing
1. Visual inspection
2. User flow testing
3. Edge case testing
4. Cross-browser testing
5. Responsive testing

### Potential Automated Tests
- Unit tests for utilities
- Integration tests for components
- E2E tests for user flows
- API mock for streaming

---

## Future Enhancements

### Code Improvements
- Extract custom hooks (`useChat`, `useStream`)
- Add error boundary components
- Implement retry logic
- Add loading skeletons
- Cache parsed markdown

### Feature Additions
- Chat history
- Export functionality
- Code highlighting
- Image support
- Voice input

---

## Common Issues & Solutions

### Issue: Auto-scroll not working
**Solution**: Check messagesEndRef placement and useEffect dependencies

### Issue: Streaming duplicates
**Solution**: Ensure proper event parsing and state updates

### Issue: TypeScript errors
**Solution**: Check interface definitions and prop types

### Issue: Styles not applying
**Solution**: Check Tailwind config and class names

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

---

## Deployment Notes

- Uses Vercel for hosting
- Automatic deployments on push
- Environment: Production
- Node version: 18+
- Build output: `.next` directory

---

Built with best practices and attention to detail! 💯
