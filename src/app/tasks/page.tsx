'use client'

import { useState } from 'react'
import { agents, mockTasks, activityFeed, Task } from '@/lib/data'
import { Plus, Calendar, User, Flag, X } from 'lucide-react'

const columns = [
  { id: 'backlog', title: 'Backlog', color: 'border-gray-600' },
  { id: 'in-progress', title: 'In Progress', color: 'border-yellow-600' },
  { id: 'review', title: 'Review', color: 'border-blue-600' },
  { id: 'done', title: 'Done', color: 'border-green-600' }
] as const

function TaskCard({ task }: { task: Task }) {
  const agent = agents.find(a => a.id === task.assignedTo)
  
  const priorityColors = {
    low: 'bg-gray-500',
    medium: 'bg-yellow-500', 
    high: 'bg-red-500'
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="card p-4 space-y-3 hover:bg-border/50 transition-colors cursor-pointer">
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-sm leading-tight">{task.title}</h3>
        <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
      </div>
      
      <p className="text-xs text-gray-400 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs">{agent?.emoji}</div>
          <span className="text-xs text-gray-400">{agent?.name}</span>
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function NewTaskModal({ isOpen, onClose, onSubmit }: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: 'sentinel',
    priority: 'medium' as const,
    dueDate: '',
    status: 'backlog' as const
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined
    })
    setFormData({
      title: '',
      description: '',
      assignedTo: 'sentinel',
      priority: 'medium',
      dueDate: '',
      status: 'backlog'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-border border border-border rounded-lg focus:outline-none focus:border-accent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-border border border-border rounded-lg focus:outline-none focus:border-accent h-24 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Assignee</label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-3 py-2 bg-border border border-border rounded-lg focus:outline-none focus:border-accent"
              >
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.emoji} {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 bg-border border border-border rounded-lg focus:outline-none focus:border-accent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Due Date (Optional)</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 bg-border border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border hover:bg-border rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ActivityItem({ item }: { item: any }) {
  const timeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="flex items-start gap-3 p-2 text-sm">
      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
      <div className="flex-1">
        <p className="text-sm">{item.action}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400">{item.agent}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{timeAgo(item.timestamp)}</span>
        </div>
      </div>
    </div>
  )
}

export default function TasksPage() {
  const [tasks, setTasks] = useState(mockTasks)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setTasks([...tasks, task])
  }

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status)
  }

  return (
    <div className="h-full flex gap-6">
      {/* Main Kanban Board */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Task Board</h1>
            <p className="text-gray-400">Manage and track agent tasks across the organization</p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            New Task
          </button>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-4 gap-6 h-full">
          {columns.map(column => (
            <div key={column.id} className="flex flex-col">
              <div className={`border-b-2 ${column.color} pb-2 mb-4`}>
                <h2 className="font-semibold">{column.title}</h2>
                <p className="text-sm text-gray-400">
                  {getTasksByStatus(column.id).length} tasks
                </p>
              </div>
              
              <div className="flex-1 space-y-3 overflow-y-auto">
                {getTasksByStatus(column.id).map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Sidebar */}
      <div className="w-80 card p-4">
        <h2 className="font-semibold mb-4">Live Activity</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {activityFeed.map(item => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  )
}