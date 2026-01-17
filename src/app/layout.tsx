import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'OmniMind - AI Research Intelligence',
  description: 'AI-powered research and knowledge management platform',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
