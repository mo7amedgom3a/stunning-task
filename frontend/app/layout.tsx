import type React from "react"
import type { Metadata } from "next"
import { Almarai } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Stunning - أول منصة عربية لتحويل أفكارك إلى تطبيقات",
  description: "ابنِ، ابتكر، وشارك - منصة هبوط لصناع SaaS مع جداول التسعير وتسليط الضوء على الميزات المتحركة",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${almarai.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
