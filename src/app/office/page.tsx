'use client'

import { useState, useEffect } from 'react'
import { agents } from '@/lib/data'

const OFFICE_WIDTH = 800
const OFFICE_HEIGHT = 600

interface AgentPosition {
  id: string
  x: number
  y: number
  status: 'active' | 'busy' | 'idle'
  currentTask?: string
}

const agentPositions: AgentPosition[] = [
  { id: 'sentinel', x: 400, y: 200, status: 'active', currentTask: 'Monitoring system performance' },
  { id: 'renee', x: 150, y: 150, status: 'busy', currentTask: 'Analyzing market trends' },
  { id: 'greg', x: 650, y: 150, status: 'active', currentTask: 'Generating health report' },
  { id: 'adam', x: 150, y: 400, status: 'idle' },
  { id: 'shelley', x: 650, y: 400, status: 'busy', currentTask: 'Planning renovation updates' },
]

function PixelAgent({ agent, position, onClick }: { 
  agent: any; 
  position: AgentPosition; 
  onClick: () => void 
}) {
  const [animationState, setAnimationState] = useState(0)

  useEffect(() => {
    if (position.status === 'active' || position.status === 'busy') {
      const interval = setInterval(() => {
        setAnimationState(prev => (prev + 1) % 4)
      }, position.status === 'active' ? 1000 : 1500)
      
      return () => clearInterval(interval)
    }
  }, [position.status])

  const getStatusColor = () => {
    switch (position.status) {
      case 'active': return '#10B981'
      case 'busy': return '#F59E0B'
      case 'idle': return '#6B7280'
      default: return '#6B7280'
    }
  }

  const getAnimationClass = () => {
    if (position.status === 'active') return 'agent-typing'
    if (position.status === 'busy') return 'agent-thinking'
    return ''
  }

  return (
    <div 
      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getAnimationClass()}`}
      style={{ left: position.x, top: position.y }}
      onClick={onClick}
    >
      {/* Agent Character */}
      <div className="relative">
        <div 
          className="w-8 h-8 rounded-sm flex items-center justify-center text-lg pixel-char"
          style={{ 
            backgroundColor: getStatusColor(),
            border: '2px solid rgba(255,255,255,0.3)'
          }}
        >
          {agent.emoji}
        </div>
        
        {/* Status indicator */}
        <div 
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full border border-background"
          style={{ backgroundColor: getStatusColor() }}
        />
      </div>

      {/* Agent Label */}
      <div className="mt-2 text-center">
        <div 
          className="px-2 py-1 text-xs font-medium rounded shadow-lg"
          style={{ 
            backgroundColor: getStatusColor(),
            color: 'white'
          }}
        >
          {agent.name.split(' ')[0]}
        </div>
      </div>
    </div>
  )
}

function OfficeMap({ onAgentClick }: { onAgentClick: (agent: any, position: AgentPosition) => void }) {
  return (
    <div 
      className="relative bg-gray-900 border-2 border-border rounded-lg mx-auto"
      style={{ width: OFFICE_WIDTH, height: OFFICE_HEIGHT }}
    >
      {/* Office Background Elements */}
      
      {/* Reception Area */}
      <div className="absolute top-4 left-4 right-4 h-16 bg-border/30 rounded border-2 border-border/50">
        <div className="p-2 text-xs text-gray-400">Reception</div>
      </div>

      {/* Central Meeting Room */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-border/20 rounded border border-border/50">
        <div className="p-2 text-xs text-gray-400">Meeting Room</div>
      </div>

      {/* Division 1 Room (Top Left) */}
      <div className="absolute top-24 left-4 w-48 h-32 bg-green-900/20 rounded border border-green-600/30">
        <div className="p-2 text-xs text-green-400">📈 Division 1: Wealth & Investments</div>
      </div>

      {/* Division 2 Room (Top Right) */}
      <div className="absolute top-24 right-4 w-48 h-32 bg-red-900/20 rounded border border-red-600/30">
        <div className="p-2 text-xs text-red-400">💪 Division 2: Health & Performance</div>
      </div>

      {/* Division 3 Room (Bottom Left) */}
      <div className="absolute bottom-24 left-4 w-48 h-32 bg-yellow-900/20 rounded border border-yellow-600/30">
        <div className="p-2 text-xs text-yellow-400">📊 Division 3: Business Intelligence</div>
      </div>

      {/* Division 4 Room (Bottom Right) */}
      <div className="absolute bottom-24 right-4 w-48 h-32 bg-purple-900/20 rounded border border-purple-600/30">
        <div className="p-2 text-xs text-purple-400">🏠 Division 4: Personal & Household</div>
      </div>

      {/* Sentinel's Central Desk */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-y-12 w-16 h-12 bg-blue-900/30 rounded border border-blue-500/50">
        <div className="text-center text-xs text-blue-400 mt-3">CEO Desk</div>
      </div>

      {/* Agent Characters */}
      {agentPositions.map(position => {
        const agent = agents.find(a => a.id === position.id)
        if (!agent) return null
        
        return (
          <PixelAgent 
            key={position.id}
            agent={agent}
            position={position}
            onClick={() => onAgentClick(agent, position)}
          />
        )
      })}

      {/* Decorative Elements */}
      <div className="absolute top-4 right-8 w-4 h-4 bg-gray-600 rounded"></div>
      <div className="absolute bottom-4 left-8 w-4 h-4 bg-gray-600 rounded"></div>
      <div className="absolute bottom-4 right-8 w-4 h-4 bg-gray-600 rounded"></div>
    </div>
  )
}

function AgentModal({ agent, position, onClose }: { 
  agent: any; 
  position: AgentPosition; 
  onClose: () => void 
}) {
  if (!agent) return null

  const getStatusColor = () => {
    switch (position.status) {
      case 'active': return 'text-status-active'
      case 'busy': return 'text-status-busy'
      case 'idle': return 'text-status-idle'
      default: return 'text-status-idle'
    }
  }

  const getStatusLabel = () => {
    switch (position.status) {
      case 'active': return 'Active'
      case 'busy': return 'Busy'
      case 'idle': return 'Idle'
      default: return 'Unknown'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="card p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{agent.emoji}</div>
            <div>
              <h2 className="text-lg font-semibold">{agent.name}</h2>
              <p className="text-sm text-accent">{agent.role}</p>
              <p className="text-xs text-gray-400">{agent.division}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor().replace('text-', 'bg-')}`} />
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusLabel()}
            </span>
          </div>
        </div>

        {position.currentTask && (
          <div className="mb-4 p-4 bg-border/30 rounded-lg">
            <h3 className="text-sm font-medium mb-2 text-accent">Current Task</h3>
            <p className="text-sm text-gray-300">{position.currentTask}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-xs text-gray-400 mb-1">Position</h4>
            <p className="text-sm">X: {position.x}, Y: {position.y}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-400 mb-1">Workstation</h4>
            <p className="text-sm">{agent.division}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Details
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-border hover:bg-border rounded-lg text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function OfficePage() {
  const [selectedAgent, setSelectedAgent] = useState<{ agent: any; position: AgentPosition } | null>(null)

  const handleAgentClick = (agent: any, position: AgentPosition) => {
    setSelectedAgent({ agent, position })
  }

  const activeAgents = agentPositions.filter(p => p.status === 'active').length
  const busyAgents = agentPositions.filter(p => p.status === 'busy').length
  const idleAgents = agentPositions.filter(p => p.status === 'idle').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">The Office</h1>
        <p className="text-gray-400">2D visualization of the virtual agent workspace</p>
      </div>

      {/* Office Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Agents</p>
              <p className="text-2xl font-semibold mt-1">{agentPositions.length}</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-2xl font-semibold mt-1 text-status-active">{activeAgents}</p>
            </div>
            <div className="w-4 h-4 bg-status-active rounded-full"></div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Busy</p>
              <p className="text-2xl font-semibold mt-1 text-status-busy">{busyAgents}</p>
            </div>
            <div className="w-4 h-4 bg-status-busy rounded-full"></div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Idle</p>
              <p className="text-2xl font-semibold mt-1 text-status-idle">{idleAgents}</p>
            </div>
            <div className="w-4 h-4 bg-status-idle rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Office Map */}
      <div className="card p-6">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold mb-2">Virtual Office Layout</h2>
          <p className="text-sm text-gray-400">Click on any agent to view their current status</p>
        </div>
        
        <OfficeMap onAgentClick={handleAgentClick} />

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-status-active rounded-full"></div>
            <span className="text-sm text-gray-400">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-status-busy rounded-full"></div>
            <span className="text-sm text-gray-400">Busy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-status-idle rounded-full"></div>
            <span className="text-sm text-gray-400">Idle</span>
          </div>
        </div>
      </div>

      {/* Agent List */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4">Agent Status Overview</h3>
        <div className="space-y-3">
          {agentPositions.map(position => {
            const agent = agents.find(a => a.id === position.id)
            if (!agent) return null

            return (
              <div 
                key={position.id}
                className="flex items-center justify-between p-3 bg-border/30 rounded-lg hover:bg-border/50 transition-colors cursor-pointer"
                onClick={() => handleAgentClick(agent, position)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl">{agent.emoji}</div>
                  <div>
                    <div className="font-medium text-sm">{agent.name}</div>
                    <div className="text-xs text-gray-400">{agent.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {position.currentTask && (
                    <div className="text-xs text-gray-400 max-w-48 truncate">
                      {position.currentTask}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full status-${position.status}`} />
                    <span className="text-xs capitalize text-gray-400">{position.status}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Agent Details Modal */}
      {selectedAgent && (
        <AgentModal 
          agent={selectedAgent.agent}
          position={selectedAgent.position}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  )
}