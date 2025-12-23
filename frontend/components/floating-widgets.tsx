"use client"

import { Cat } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function FloatingWidgets() {
  return (
    <>
      {/* Cyber Monday Badge - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-20">
        <div className="neon-border flex size-28 flex-col items-center justify-center rounded-full border-4 border-dashed border-cyan-500 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">CYBER</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">MONDAY</div>
            <Badge className="mt-1 bg-cyan-500 text-xs text-white hover:bg-cyan-600">خصم 30%</Badge>
          </div>
        </div>
      </div>

      {/* Support FAB - Bottom Right */}
      <button className="fixed bottom-8 right-8 z-20 flex size-16 items-center justify-center rounded-full bg-purple-600 shadow-lg transition-all hover:scale-110 hover:bg-purple-700">
        <Cat className="size-8 text-white" strokeWidth={2.5} />
      </button>
    </>
  )
}
