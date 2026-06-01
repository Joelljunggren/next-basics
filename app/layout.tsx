import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Toaster } from "@/components/ui/sonner"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <header className="flex h-16 items-center border-b px-4">
            <nav className="flex gap-2">
              <Button asChild variant={"default"}>
                <Link href="/">Home</Link>
              </Button>
              <Button asChild variant={"default"}>
                <Link href="/about">About</Link>
              </Button>
              <Button asChild variant={"default"}>
                <Link href="/posts">Posts</Link>
              </Button>
              <Button asChild variant={"default"}>
                <Link href="/posts/create">Create Posts</Link>
              </Button>
            </nav>
          </header>
          {children}

          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
