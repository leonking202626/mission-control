'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export default function TopBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-AU', {
      timeZone: 'Australia/Melbourne',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold">Mission Control</h1>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <Clock size={16} />
        <span>{formatTime(time)} AEST</span>
      </div>
    </header>
  )
}