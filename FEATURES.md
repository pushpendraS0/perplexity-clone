# Features Documentation 📋

## Overview

This Perplexity AI clone implements all the required features with pixel-perfect design and smooth user experience.

## 1. Landing Page ✨

### Hero Section
- **Gradient Branding**: Blue to purple gradient for logo and CTAs
- **Large Heading**: "Where knowledge begins" with modern typography
- **Subtitle**: Clear value proposition
- **Animated Entry**: Smooth fade-in animation on page load

### Search Bar
- **Large Input**: Easy-to-use search bar with icon
- **Gradient Border**: Appears on hover for visual feedback
- **Enter to Search**: Submit with Enter key
- **Auto-focus**: Input is focused on page load
- **Search Button**: Gradient CTA button with arrow icon
- **Disabled State**: Grayed out when input is empty

### Example Questions
- **Quick Start**: 4 pre-defined questions
- **Interactive Cards**: Clickable cards that populate search
- **Hover Effects**: Border color change and arrow appearance
- **Responsive Grid**: 2 columns on desktop, 1 on mobile

## 2. Chat Interface 💬

### Header
- **Branding**: Logo with gradient background
- **New Chat Button**: Clear conversations and return to home
- **Sticky Position**: Stays at top while scrolling

### Message Display
- **User Messages**: 
  - User icon with gray background
  - Clear typography
  - Fade-in animation

- **Assistant Messages**:
  - AI icon with gradient background
  - Multiple streaming states
  - Source citations
  - Markdown rendering

### Streaming States

#### 1. Initial Loading
- Spinner animation
- Status text (e.g., "Searching...")
- Smooth pulsing effect

#### 2. URL Crawling
- **Domain Pills**: Small badges showing domains being searched
- **Pulsing Dots**: Animated indicators for each domain
- **Limited Display**: Shows up to 5 domains
- **Auto-update**: Adds new domains as they're found

#### 3. Text Streaming
- **Word-by-Word**: Text appears progressively
- **Cursor Effect**: Blinking cursor during streaming
- **Smooth Rendering**: No flickering or jumps
- **Auto-scroll**: Follows streaming content

#### 4. Source Citations
- **Source Cards**: 
  - Numbered badges (1, 2, 3...)
  - Title and domain
  - External link icon
  - Hover effects
  - Clickable links
- **Grid Layout**: 2 columns on desktop
- **Border Separator**: Clean visual separation

### Markdown Rendering

Supports:
- **Headings**: H1, H2, H3 with proper styling
- **Lists**: Ordered and unordered with proper spacing
- **Tables**: Fully styled with borders and padding
- **Code**: Inline and block code with gray background
- **Emphasis**: Bold and italic text
- **Paragraphs**: Proper spacing and line height

### Chat Input

#### Features
- **Auto-resize**: Textarea grows with content
- **Max Height**: Scrollable after 200px
- **Keyboard Shortcuts**:
  - Enter: Send message
  - Shift+Enter: New line
- **Gradient Button**: Matches branding
- **Disabled States**: 
  - Gray when streaming
  - Gray when input empty
- **Helper Text**: Instructions below input

#### Visual Feedback
- **Border Highlight**: Blue border on focus
- **Shadow Effect**: Elevation on focus
- **Button Animation**: Smooth color transitions
- **Loading State**: Disabled during streaming

## 3. Animations & Transitions 🎬

### Page Transitions
- **Fade In**: 0.3s ease-out for all messages
- **Slide Up**: Subtle upward movement on entry

### Loading Animations
- **Spinner**: Rotating loader icon
- **Pulse Dots**: Staggered pulse animation for URL indicators
- **Shimmer**: Loading shimmer for skeletons (if needed)

### Hover Effects
- **Buttons**: Color darkening on hover
- **Cards**: Border color change and shadow
- **Sources**: Blue text color on hover
- **Input**: Border and shadow on focus

### Scroll Behavior
- **Auto-scroll**: Smooth scroll to bottom on new messages
- **Instant Scroll**: Quick scroll when user sends message
- **Smart Detection**: Only scrolls if near bottom

## 4. Responsive Design 📱

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- **Single Column**: Example questions stack vertically
- **Touch Targets**: Larger buttons for touch
- **Full Width**: Content uses full screen width
- **Readable Text**: Optimized font sizes
- **Scroll**: Smooth scrolling on mobile

### Desktop Optimizations
- **Max Width**: 4xl (896px) for content
- **Centered Layout**: Content centered in viewport
- **Grid Layouts**: 2 columns for examples and sources
- **Hover States**: Rich hover interactions

## 5. User Experience Details 🎯

### Smart Behaviors
- **URL Parameter**: Landing page search uses `?q=` parameter
- **State Persistence**: Messages stay during session
- **Error Handling**: Graceful error messages
- **Loading States**: Clear feedback during operations

### Accessibility
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive icon labels
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Visible focus states
- **ARIA Labels**: Screen reader support (can be enhanced)

### Performance
- **Code Splitting**: Automatic by Next.js
- **Lazy Loading**: Components load on demand
- **Optimized Images**: Next.js Image component (if used)
- **Minimal Rerenders**: Optimized React hooks
- **Efficient Streaming**: Memory-efficient SSE handling

## 6. API Integration 🌐

### Streaming Implementation
- **SSE Parser**: Custom stream parser
- **Event Handling**: Multiple event types
- **Error Recovery**: Catches and displays errors
- **State Management**: TanStack Query for caching

### Data Flow
1. User sends question
2. User message added to state
3. Assistant message created with loading state
4. Stream starts
5. Events update assistant message
6. Stream completes
7. Final state with sources

## 7. Code Quality 💎

### TypeScript
- **Full Type Safety**: All components typed
- **Interfaces**: Clear type definitions
- **No Any**: Minimal use of `any` type
- **Strict Mode**: TypeScript strict mode enabled

### Component Structure
- **Separation of Concerns**: Each component has one job
- **Reusability**: Components can be reused
- **Props Interface**: Clear prop types
- **Custom Hooks**: Can be extracted if needed

### Styling
- **TailwindCSS**: Utility-first approach
- **Consistent Spacing**: Tailwind spacing scale
- **Color System**: Defined color palette
- **Responsive**: Mobile-first approach

## 8. Edge Cases Handled ✅

- Empty input submission (blocked)
- Streaming during streaming (blocked)
- Network errors (error message)
- Empty responses (handled)
- Long messages (scrollable)
- Multiple rapid questions (queued)
- Browser back button (navigation preserved)
- Page refresh (state reset)

## 9. Not Implemented (As Per Scope) ❌

Following features were intentionally skipped as per assignment:
- Dropdowns
- Settings modal
- Profile menus
- Tooltips
- User authentication
- Chat history persistence
- Export chat functionality
- Dark mode (light mode only as required)

## 10. Future Enhancements 🚀

Possible improvements (not in scope):
- Chat history in sidebar
- Export conversation as PDF/Text
- Copy code blocks
- Voice input
- Image search
- Multi-modal responses
- Real API integration
- User accounts
- Saved searches

---

Built with attention to every detail! 💯
