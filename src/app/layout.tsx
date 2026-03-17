import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'

export const metadata: Metadata = {
  title: 'Mission Control - Robbie Hunt HQ',
  description: 'Agent organization dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-white">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}