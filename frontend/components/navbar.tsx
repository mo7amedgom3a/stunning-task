"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Cat } from "lucide-react"

export function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4">
      {/* Right side (Start in RTL) - Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-purple-600">
            <Cat className="size-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-foreground">Stunning</span>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            BETA
          </Badge>
        </div>
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden items-center gap-8 md:flex">
        <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          مجتمع
        </a>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none">
            الموارد
            <ChevronDown className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>المستندات</DropdownMenuItem>
            <DropdownMenuItem>البرامج التعليمية</DropdownMenuItem>
            <DropdownMenuItem>الأمثلة</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          سوق المشاريع
        </a>
        <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          صناع المحتوى
        </a>
        <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          الباقات والأسعار
        </a>
      </div>

      {/* Left side (End in RTL) - Language Switcher & Login */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm">
          <button className="text-muted-foreground transition-colors hover:text-foreground">EN</button>
          <Globe className="size-3 text-muted-foreground" />
          <button className="font-semibold text-foreground">AR</button>
        </div>

        <Button className="bg-purple-600 text-white hover:bg-purple-700">Login</Button>
      </div>
    </nav>
  )
}
