'use client'

import { useState } from 'react'
import { mockProjects, agents } from '@/lib/data'
import { Calendar, User, BarChart3, Clock, CheckCircle2, Circle, List, Timer } from 'lucide-react'

function ProjectCard({ project }: { project: any }) {
  const agent = agents.find(a => a.id === project.assignedAgent)
  
  const statusColors = {
    planning: 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    review: 'bg-yellow-500',
    completed: 'bg-green-500'
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    })
  }

  const completedMilestones = project.milestones.filter((m: any) => m.completed).length
  const totalMilestones = project.milestones.length

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{project.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{project.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusColors[project.status as keyof typeof statusColors]}`}>
          {project.status.replace('-', ' ')}
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-gray-400">{project.progress}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Milestones */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Milestones</span>
          <span className="text-xs text-gray-400">
            {completedMilestones}/{totalMilestones} completed
          </span>
        </div>
        <div className="space-y-2">
          {project.milestones.slice(0, 3).map((milestone: any) => (
            <div key={milestone.id} className="flex items-center gap-2">
              {milestone.completed ? (
                <CheckCircle2 size={16} className="text-status-active" />
              ) : (
                <Circle size={16} className="text-gray-500" />
              )}
              <span className={`text-sm ${milestone.completed ? 'text-gray-400 line-through' : 'text-gray-300'}`}>
                {milestone.title}
              </span>
              <span className="text-xs text-gray-500 ml-auto">
                {formatDate(milestone.dueDate)}
              </span>
            </div>
          ))}
          {project.milestones.length > 3 && (
            <div className="text-xs text-gray-400 ml-6">
              +{project.milestones.length - 3} more milestones
            </div>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-400" />
          <div>
            <div className="text-xs text-gray-400">Assigned Agent</div>
            <div className="text-sm">{agent?.emoji} {agent?.name}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <div>
            <div className="text-xs text-gray-400">Due Date</div>
            <div className="text-sm">
              {project.endDate ? formatDate(project.endDate) : 'Not set'}
            </div>
          </div>
        </div>
      </div>

      {/* Next Action */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <Clock size={14} className="text-accent" />
          <span className="text-xs font-medium text-accent">Next Action</span>
        </div>
        <p className="text-sm text-gray-300">{project.nextAction}</p>
      </div>
    </div>
  )
}

function TimelineView({ projects }: { projects: any[] }) {
  const today = new Date()
  const sixMonthsLater = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000)

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })
  }

  const getProjectPosition = (project: any) => {
    const startTime = project.startDate.getTime()
    const endTime = project.endDate ? project.endDate.getTime() : sixMonthsLater.getTime()
    const totalTime = sixMonthsLater.getTime() - today.getTime()
    
    const leftPercent = Math.max(0, (startTime - today.getTime()) / totalTime * 100)
    const widthPercent = Math.min(100 - leftPercent, (endTime - Math.max(startTime, today.getTime())) / totalTime * 100)
    
    return { left: `${leftPercent}%`, width: `${widthPercent}%` }
  }

  const projectColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500']

  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-6">Project Timeline</h3>
      
      {/* Timeline Header */}
      <div className="relative mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>{formatMonth(today)}</span>
          <span>{formatMonth(new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000))}</span>
          <span>{formatMonth(new Date(today.getTime() + 120 * 24 * 60 * 60 * 1000))}</span>
          <span>{formatMonth(sixMonthsLater)}</span>
        </div>
        <div className="h-px bg-border relative">
          <div className="absolute left-0 top-0 w-px h-4 bg-accent"></div>
          <div className="absolute left-1/3 top-0 w-px h-4 bg-border"></div>
          <div className="absolute left-2/3 top-0 w-px h-4 bg-border"></div>
          <div className="absolute right-0 top-0 w-px h-4 bg-border"></div>
        </div>
      </div>

      {/* Project Bars */}
      <div className="space-y-6">
        {projects.map((project, index) => {
          const position = getProjectPosition(project)
          const agent = agents.find(a => a.id === project.assignedAgent)
          
          return (
            <div key={project.id} className="relative">
              <div className="flex items-center mb-2">
                <div className="w-4 mr-3">{agent?.emoji}</div>
                <div>
                  <div className="font-medium text-sm">{project.name}</div>
                  <div className="text-xs text-gray-400">{agent?.name}</div>
                </div>
                <div className="ml-auto text-xs text-gray-400">
                  {project.progress}%
                </div>
              </div>
              
              <div className="relative h-6 bg-border/30 rounded">
                <div 
                  className={`absolute top-0 h-full rounded ${projectColors[index % projectColors.length]} opacity-80`}
                  style={position}
                >
                  <div 
                    className={`h-full rounded ${projectColors[index % projectColors.length]}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [view, setView] = useState<'cards' | 'timeline'>('cards')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Projects</h1>
          <p className="text-gray-400">Track progress across all active projects</p>
        </div>
        
        <div className="flex items-center gap-2 bg-border p-1 rounded-lg">
          <button
            onClick={() => setView('cards')}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
              view === 'cards' 
                ? 'bg-accent text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <List size={16} />
            Cards
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
              view === 'timeline' 
                ? 'bg-accent text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Timer size={16} />
            Timeline
          </button>
        </div>
      </div>

      {view === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <TimelineView projects={mockProjects} />
      )}

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Projects</p>
              <p className="text-2xl font-semibold mt-1">{mockProjects.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-accent" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">In Progress</p>
              <p className="text-2xl font-semibold mt-1">
                {mockProjects.filter(p => p.status === 'in-progress').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-semibold mt-1">
                {mockProjects.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-status-active" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Progress</p>
              <p className="text-2xl font-semibold mt-1">
                {Math.round(mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length)}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-accent" />
          </div>
        </div>
      </div>
    </div>
  )
}