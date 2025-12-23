import { Navbar } from "@/components/navbar"
import { MagicInputCard } from "@/components/magic-input-card"
import { SocialProof } from "@/components/social-proof"
import { FloatingWidgets } from "@/components/floating-widgets"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="mesh-gradient" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="mb-16 space-y-6 text-center">
            <h1 className="text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
              أول منصة عربية لتحويل أفكارك إلى تطبيقات
            </h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">ابنِ، ابتكر، وشارك</p>
          </div>

          {/* Magic Input Card */}
          <MagicInputCard />

          {/* Social Proof */}
          <SocialProof />
        </main>
      </div>

      {/* Floating Widgets */}
      <FloatingWidgets />
    </div>
  )
}
