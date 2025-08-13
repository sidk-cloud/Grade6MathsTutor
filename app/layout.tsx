import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grade 6 Maths Tutor',
  description: 'Interactive Grade 6 mathematics learning platform with voice guidance and AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
