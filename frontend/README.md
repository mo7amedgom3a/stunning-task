# Frontend - Stunning Task

> Modern Next.js frontend with AI-powered idea improvement and bilingual support.

## 🎨 Overview

The frontend is a beautifully designed Next.js application that provides an intuitive interface for users to input their website ideas and receive AI-enhanced, structured prompts. It features automatic language detection, RTL/LTR support, markdown rendering, and stunning visual effects.

## ✨ Features

### Core Features

- 🤖 **AI Integration**: Real-time communication with backend API
- 🌍 **Bilingual Support**: Automatic RTL (Arabic) and LTR (English) text direction
- 📝 **Markdown Rendering**: Beautiful formatting for AI responses
- 🎨 **Animated UI**: Gradient border loops and smooth transitions
- ⚡ **Real-time Validation**: Character counter and input validation
- 🎯 **Error Handling**: User-friendly error messages

### Visual Effects

- Animated gradient border (Purple → Pink → Orange → Blue)
- Enhanced shadows with glow effects
- Smooth hover states
- Fade-in animations for results
- Premium glassmorphism design

## 🛠️ Technology Stack

- **Framework**: Next.js 16.0.10
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Animations**: Tailwind Animate, tw-animate-css

## 📁 Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # Radix UI components
│   ├── magic-input-card.tsx # Main input component
│   ├── markdown-renderer.tsx # Markdown parser
│   ├── navbar.tsx           # Navigation bar
│   ├── social-proof.tsx     # Social proof section
│   └── floating-widgets.tsx # Floating UI elements
├── api/
│   └── improveIdea.ts       # API service layer
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── styles/                  # Additional styles
└── package.json            # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or pnpm

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set environment variables**

   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎯 Key Components

### MagicInputCard

The main component handling user input and AI interaction.

**Features:**

- Text direction detection
- API integration
- Loading states
- Error handling
- Character limit (500)

**Location**: `components/magic-input-card.tsx`

### MarkdownRenderer

Custom markdown parser for AI responses.

**Supported Syntax:**

- Headers (`#`, `##`, `###`)
- Bold (`**text**`)
- Italic (`*text*`)
- Bullet lists (`*`, `-`, `+`)
- Numbered lists (`1.`, `2.`)

**Location**: `components/markdown-renderer.tsx`

### API Service

Centralized API communication layer.

**Features:**

- Type-safe requests
- Error handling
- Environment variable support

**Location**: `api/improveIdea.ts`

## 🎨 Styling

### Custom Animations

**Gradient Border Loop** (4-second cycle):

```css
@keyframes gradient-border {
  0%   → Purple
  25%  → Pink
  50%  → Orange
  75%  → Blue
  100% → Purple
}
```

**Glow Shadow Effect**:

```css
@keyframes gradient-glow {
  /* Synchronized with border colors */
}
```

### Color Palette

| Color            | Usage               |
| ---------------- | ------------------- |
| Purple (#8b5cf6) | Primary brand color |
| Pink (#ec4899)   | Accent color        |
| Orange (#f97316) | Energy color        |
| Blue (#3b82f6)   | Trust color         |

## 🌍 Internationalization

### Language Detection

Automatic detection using Unicode ranges:

- **Arabic**: `\u0600-\u06FF`
- **English**: Default (Latin characters)

### Text Direction

- **RTL**: Applied for Arabic text
- **LTR**: Applied for English text

Both input and output automatically adjust direction.

## 🔌 API Integration

### Endpoint

```typescript
POST http://localhost:8000/improve
```

### Request

```typescript
{
  idea: string;
}
```

### Response

```typescript
{
  improved_content: string;
}
```

### Usage

```typescript
import { improveIdea } from "@/api/improveIdea";

const result = await improveIdea("I want a website for my gym");
```

## 🐳 Docker

### Development

```bash
# Using docker-compose
docker-compose up frontend
```

### Dockerfile

The frontend uses a simple development Dockerfile:

- Node.js 20 Alpine
- Hot reload enabled
- Port 3000 exposed

## 📦 Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## 🎯 Environment Variables

| Variable              | Description     | Default                 |
| --------------------- | --------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

## 🧪 Testing

### Manual Testing Checklist

- [ ] Arabic input displays RTL
- [ ] English input displays LTR
- [ ] Markdown renders correctly
- [ ] Animations work smoothly
- [ ] Error messages display properly
- [ ] Character counter updates
- [ ] Loading states show correctly

## 🎨 UI Components

### Radix UI Components Used

- Dropdown Menu
- Button
- Badge
- Tooltip
- Dialog
- And more...

All components are customized with Tailwind CSS for consistent styling.

## 📱 Responsive Design

The application is fully responsive:

- Mobile: Optimized layout
- Tablet: Adjusted spacing
- Desktop: Full experience

## ⚡ Performance

### Optimizations

- Code splitting
- Lazy loading
- Image optimization
- CSS purging
- Standalone output for Docker

## 🔧 Configuration Files

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## 🤝 Contributing

When contributing to the frontend:

1. Follow the existing code style
2. Use TypeScript for type safety
3. Keep components small and focused
4. Write meaningful commit messages
5. Test RTL/LTR support

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [TypeScript](https://www.typescriptlang.org)
