import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unity React POC',
  description: 'Unity WebGL with React integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}