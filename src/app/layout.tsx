import { Font_Mulish200 } from "@/fonts"

import "./globals.css"

export const metadata = {
  title: "desk mate",
  description: "a good virtual mate to help you organize your to-do items"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main
          className="flex h-screen w-screen"
          style={{ fontFamily: Font_Mulish200.style.fontFamily }}>
          {children}
        </main>
      </body>
    </html>
  )
}

export const dynamic = "force-dynamic"
