import React from "react"

interface MarkdownRendererProps {
  content: string
  dir?: "rtl" | "ltr"
  className?: string
}

export function MarkdownRenderer({ content, dir = "ltr", className = "" }: MarkdownRendererProps) {
  const parseMarkdown = (text: string) => {
    const elements: React.ReactNode[] = []
    const lines = text.split("\n")
    let key = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Skip empty lines
      if (!line.trim()) {
        elements.push(<br key={key++} />)
        continue
      }

      // Parse headers (### Header, ## Header, # Header)
      if (line.startsWith("###")) {
        elements.push(
          <h3 key={key++} className="text-lg font-bold mt-4 mb-2">
            {parseLine(line.replace(/^###\s*/, ""))}
          </h3>
        )
        continue
      }
      if (line.startsWith("##")) {
        elements.push(
          <h2 key={key++} className="text-xl font-bold mt-4 mb-2">
            {parseLine(line.replace(/^##\s*/, ""))}
          </h2>
        )
        continue
      }
      if (line.startsWith("#")) {
        elements.push(
          <h1 key={key++} className="text-2xl font-bold mt-4 mb-2">
            {parseLine(line.replace(/^#\s*/, ""))}
          </h1>
        )
        continue
      }

      // Parse bullet points (*, -, +)
      if (line.match(/^\s*[\*\-\+]\s+/)) {
        const indent = line.match(/^\s*/)?.[0].length || 0
        const content = line.replace(/^\s*[\*\-\+]\s+/, "")
        elements.push(
          <li key={key++} className={`ml-${Math.floor(indent / 2) * 4} mb-1`}>
            {parseLine(content)}
          </li>
        )
        continue
      }

      // Parse numbered lists (1., 2., etc.)
      if (line.match(/^\s*\d+\.\s+/)) {
        const indent = line.match(/^\s*/)?.[0].length || 0
        const content = line.replace(/^\s*\d+\.\s+/, "")
        elements.push(
          <li key={key++} className={`ml-${Math.floor(indent / 2) * 4} mb-1 list-decimal`}>
            {parseLine(content)}
          </li>
        )
        continue
      }

      // Regular paragraph
      elements.push(
        <p key={key++} className="mb-2">
          {parseLine(line)}
        </p>
      )
    }

    return elements
  }

  const parseLine = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = []
    let currentText = text
    let key = 0

    // Parse bold (**text** or __text__)
    const boldPattern = /(\*\*|__)(.*?)\1/g
    let lastIndex = 0
    let match

    while ((match = boldPattern.exec(currentText)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        const beforeText = currentText.substring(lastIndex, match.index)
        parts.push(...parseItalic(beforeText, key++))
      }

      // Add bold text
      parts.push(
        <strong key={`bold-${key++}`} className="font-bold">
          {match[2]}
        </strong>
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < currentText.length) {
      const remainingText = currentText.substring(lastIndex)
      parts.push(...parseItalic(remainingText, key++))
    }

    return parts.length > 0 ? parts : [currentText]
  }

  const parseItalic = (text: string, baseKey: number): React.ReactNode[] => {
    const parts: React.ReactNode[] = []
    const italicPattern = /(\*|_)(.*?)\1/g
    let lastIndex = 0
    let match
    let key = baseKey

    while ((match = italicPattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }

      // Add italic text
      parts.push(
        <em key={`italic-${key++}`} className="italic">
          {match[2]}
        </em>
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : [text]
  }

  return (
    <div dir={dir} className={`leading-relaxed ${dir === "rtl" ? "text-right" : "text-left"} ${className}`}>
      {parseMarkdown(content)}
    </div>
  )
}
