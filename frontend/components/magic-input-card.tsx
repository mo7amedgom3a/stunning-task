"use client"

import { useState, useEffect } from "react"
import { Info, Mic, FileText, ImageIcon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { improveIdea } from "@/api/improveIdea"
import { MarkdownRenderer } from "@/components/markdown-renderer"

// Detect if text contains Arabic characters
const isArabic = (text: string): boolean => {
  const arabicPattern = /[\u0600-\u06FF]/
  return arabicPattern.test(text)
}

export function MagicInputCard() {
  const [text, setText] = useState("")
  const [isImproving, setIsImproving] = useState(false)
  const [improvedText, setImprovedText] = useState("")
  const [error, setError] = useState("")
  const [inputDir, setInputDir] = useState<"rtl" | "ltr">("rtl")
  const [outputDir, setOutputDir] = useState<"rtl" | "ltr">("rtl")

  // Update text direction based on input
  useEffect(() => {
    if (text.trim()) {
      setInputDir(isArabic(text) ? "rtl" : "ltr")
    }
  }, [text])

  const handleImprove = async () => {
    if (!text.trim()) return

    setIsImproving(true)
    setError("")
    setImprovedText("") // Clear previous result

    try {
      // Use streaming API with callback for progressive updates
      const improvedContent = await improveIdea(text, (chunk) => {
        // Update the improved text progressively as chunks arrive
        setImprovedText((prev) => prev + chunk)
      })
      
      // Detect output direction based on final content
      setOutputDir(isArabic(improvedContent) ? "rtl" : "ltr")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to improve idea. Please try again.")
      console.error("Error improving idea:", err)
    } finally {
      setIsImproving(false)
    }
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-4xl space-y-6">
      {/* Main Input Card with Border Trail */}
      <div className="magic-input-border">
        {/* Animated Border Container */}
        <div className="border-container">
          <div className="border-trail" />
          <div className="border-trail" />
          <div className="border-trail" />
        </div>
        
        {/* Content */}
        <div className="magic-input-content p-6 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(239,68,68,0.2)]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="أنشئ موقعًا ويب لخلاصتك"
            dir={inputDir}
            className={`min-h-[200px] w-full resize-none border-none bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none ${
              inputDir === "rtl" ? "text-right" : "text-left"
            }`}
            maxLength={500}
          />

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{text.length}/500</span>
              <button className="text-muted-foreground transition-colors hover:text-foreground">
                <Info className="size-5" />
              </button>
              <button className="text-muted-foreground transition-colors hover:text-foreground">
                <Mic className="size-5" />
              </button>
              <button className="text-muted-foreground transition-colors hover:text-foreground">
                <FileText className="size-5" />
              </button>
              <button className="text-muted-foreground transition-colors hover:text-foreground">
                <ImageIcon className="size-5" />
              </button>
            </div>

            <Button
              onClick={handleImprove}
              disabled={!text.trim() || isImproving}
              className="bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isImproving ? (
                <span>جاري التحسين...</span>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  <span>حسِّن فكرتك</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="animate-in fade-in slide-in-from-bottom-4 rounded-xl bg-red-50 p-4 shadow-lg duration-500">
          <p className="text-center text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Improved Output Card */}
      {improvedText && (
        <div className="animate-in fade-in slide-in-from-bottom-4 rounded-xl bg-white p-6 shadow-2xl duration-500 border border-purple-100">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="size-5 text-purple-600" />
            <span className="font-semibold text-purple-600">النتيجة المحسّنة</span>
          </div>
          <MarkdownRenderer 
            content={improvedText}
            dir={outputDir}
            className="text-foreground"
          />
        </div>
      )}
    </div>
  )
}
