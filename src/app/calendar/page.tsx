'use client'

import { useState } from 'react'
import { scheduledEvents } from '@/lib/data'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react'

function EventCard({ event }: { event: any }) {
  return (
    <div 
      className="p-2 rounded text-xs text-white font-medium mb-1 cursor-pointer hover:opacity-80 transition-opacity"
      style={{ backgroundColor: event.color }}
    >
      <div className="font-semibold">{event.title}</div>
      <div className="opacity-90">{event.time}</div>
      <div className="opacity-80">{event.agent}</div>
    </div>
  )
}

function EventDetail({ event, onClose }: { event: any; onClose: () => void }) {
  if (!event) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="card p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-400">{event.agent} • {event.division}</p>
          </div>
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: event.color }}
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span className="text-sm">{event.time}</span>
            <span className="text-xs bg-border px-2 py-1 rounded capitalize">
              {event.type}
            </span>
          </div>
          
          <p className="text-sm text-gray-300">{event.description}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 border border-border hover:bg-border rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDay = firstDay.getDay()

  // Generate calendar days
  const calendarDays = []
  
  // Empty cells for days before month starts
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(null)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(month - 1)
    } else {
      newDate.setMonth(month + 1)
    }
    setCurrentDate(newDate)
  }

  const isToday = (day: number) => {
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear()
  }

  const getEventsForDay = (day: number) => {
    // For demo purposes, show different events on different days
    const dayEvents = []
    
    if (day % 7 === 1) { // Mondays
      dayEvents.push(...scheduledEvents.filter(e => e.id === 'bi-brief' || e.id === 'health-snapshot'))
    }
    if (day % 7 === 0) { // Sundays
      dayEvents.push(...scheduledEvents.filter(e => e.id === 'weekly-brief'))
    }
    // Daily events on weekdays
    if (day % 7 !== 0 && day % 7 !== 6) {
      dayEvents.push(...scheduledEvents.filter(e => e.type === 'daily'))
    }
    
    return dayEvents
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Calendar</h1>
          <p className="text-gray-400">Scheduled cron jobs and proactive tasks</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-border rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h2 className="text-lg font-semibold min-w-[200px] text-center">
            {monthNames[month]} {year}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-border rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="card p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-4">
          {calendarDays.map((day, index) => (
            <div 
              key={index} 
              className={`min-h-[120px] p-2 border border-border/50 rounded-lg ${
                day && isToday(day) ? 'bg-accent/10 border-accent' : ''
              }`}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium mb-2 ${
                    isToday(day) ? 'text-accent' : 'text-gray-300'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {getEventsForDay(day).map((event, eventIndex) => (
                      <EventCard 
                        key={`${event.id}-${eventIndex}`} 
                        event={event}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4">Schedule Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduledEvents.map(event => (
            <div 
              key={event.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-border/50 p-3 rounded-lg transition-colors"
              onClick={() => setSelectedEvent(event)}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: event.color }}
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{event.title}</div>
                <div className="text-xs text-gray-400">{event.time} • {event.agent}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetail 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  )
}