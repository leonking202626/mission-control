'use client';
// @ts-nocheck
import { useState, useEffect } from 'react';
import { Activity, Mail, MessageCircle, Settings } from 'lucide-react'

function AgentCard({ agent, isHuman = false, isLeader = false }: { 
  agent: any; 
  isHuman?: boolean; 
  isLeader?: boolean; 
}) {
  const statusColors: any = {
    active: 'bg-status-active',
    busy: 'bg-status-busy', 
    idle: 'bg-status-idle'
  }

  const statusLabels: any = {
    active: 'Active',
    busy: 'Busy',
    idle: 'Idle'
  }

  return (
    <div className={`card p-6 text-center relative ${
      isHuman ? 'bg-gradient-to-br from-accent/20 to-purple-600/20 border-accent/40' :
      isLeader ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/40' :
      'hover:bg-border/50'
    } transition-all duration-200`}>
      
      {/* Status Indicator */}
      {!isHuman && (
        <div className="absolute top-4 right-4">
          <div className={`w-3 h-3 rounded-full ${statusColors[agent.status]}`} title={statusLabels[agent.status]} />
        </div>
      )}

      {/* Agent Avatar */}
      <div className="mb-4">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
          isHuman ? 'bg-accent/20 border-2 border-accent' :
          isLeader ? 'bg-blue-500/20 border-2 border-blue-500' :
          'bg-border'
        }`}>
          {agent.emoji}
        </div>
      </div>

      {/* Agent Info */}
      <h3 className="font-semibold text-lg mb-1">{agent.name}</h3>
      <p className="text-sm text-accent font-medium mb-1">{agent.role}</p>
      <p className="text-xs text-gray-400 mb-4">{agent.division}</p>

      {/* Current Task */}
      {agent.currentTask && (
        <div className="bg-border/50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 justify-center mb-1">
            <Activity size={14} className="text-accent" />
            <span className="text-xs font-medium text-accent">Current Task</span>
          </div>
          <p className="text-xs text-gray-300">{agent.currentTask}</p>
        </div>
      )}

      {/* Actions */}
      {!isHuman && (
        <div className="flex justify-center gap-2">
          <button className="p-2 hover:bg-border rounded-lg transition-colors" title="Send Message">
            <MessageCircle size={16} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-border rounded-lg transition-colors" title="View Logs">
            <Mail size={16} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-border rounded-lg transition-colors" title="Settings">
            <Settings size={16} className="text-gray-400" />
          </button>
        </div>
      )}
    </div>
  )
}

function OrgChart({ agents }) {
  const leon = agents.find(a => a.id === 'leon')!
  const sentinel = agents.find(a => a.id === 'sentinel')!
  const divisionAgents = agents.filter(a => a.id !== 'leon' && a.id !== 'sentinel')

  return (
    <div className="space-y-8">
      {/* Leon - Top Level */}
      <div className="flex justify-center">
        <div className="w-80">
          <AgentCard agent={leon} isHuman={true} />
        </div>
      </div>

      {/* Connection Line */}
      <div className="flex justify-center">
        <div className="w-px h-8 bg-border" />
      </div>

      {/* Sentinel - CEO Agent */}
      <div className="flex justify-center">
        <div className="w-80">
          <AgentCard agent={sentinel} isLeader={true} />
        </div>
      </div>

      {/* Connection Lines to Divisions */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-px h-8 bg-border" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-96 h-px bg-border" />
          {/* Vertical drops */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -ml-36 w-px h-8 bg-border" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -ml-12 w-px h-8 bg-border" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 ml-12 w-px h-8 bg-border" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 ml-36 w-px h-8 bg-border" />
        </div>
      </div>

      {/* Division Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {divisionAgents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}

function TeamStats({ agents }) {
  const totalAgents = agents.length - 1 // Exclude Leon
  const activeAgents = agents.filter(a => a.status === 'active' && a.id !== 'leon').length
  const busyAgents = agents.filter(a => a.status === 'busy').length
  const idleAgents = agents.filter(a => a.status === 'idle').length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="card p-6 text-center">
        <div className="text-2xl font-bold mb-2">{totalAgents}</div>
        <div className="text-sm text-gray-400">Total Agents</div>
      </div>
      
      <div className="card p-6 text-center">
        <div className="text-2xl font-bold mb-2 text-status-active">{activeAgents}</div>
        <div className="text-sm text-gray-400">Active</div>
      </div>
      
      <div className="card p-6 text-center">
        <div className="text-2xl font-bold mb-2 text-status-busy">{busyAgents}</div>
        <div className="text-sm text-gray-400">Busy</div>
      </div>
      
      <div className="card p-6 text-center">
        <div className="text-2xl font-bold mb-2 text-status-idle">{idleAgents}</div>
        <div className="text-sm text-gray-400">Idle</div>
      </div>
    </div>
  )
}

export default function TeamPage() {

// ---> PASTE ALL OF THIS NEW LIVE WIRE CODE HERE <---
const [liveAgents, setLiveAgents] = useState([]);

useEffect(() => {
const fetchLiveSwarm = async () => {
try {
const response = await fetch('http://127.0.0.1:18789/api/agents');
const data = await response.json();
setLiveAgents(data);
} catch (error) {
console.error("Mission Control lost connection:", error);
}
};

fetchLiveSwarm();
const heartbeat = setInterval(fetchLiveSwarm, 2000);
return () => clearInterval(heartbeat);
}, []);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Team</h1>
        <p className="text-gray-400">Organization structure and agent management</p>
      </div>

      {/* Mission Statement */}
      <div className="card p-8 bg-gradient-to-r from-accent/10 to-purple-600/10 border border-accent/20">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Mission Statement</h2>
          <p className="text-gray-300 text-lg italic leading-relaxed max-w-3xl mx-auto">
            "Build an autonomous organization of AI agents that do work for me and produce value 24/7."
          </p>
        </div>
      </div>

      {/* Team Stats */}
<TeamStats agents={liveAgents} />

{/* Organization Chart */}
<div className="card p-8">
<h2 className="text-xl font-semibold mb-8 text-center">Organization Structure</h2>
<OrgChart agents={liveAgents} />
</div>

      {/* Division Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Division Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-border/30 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-lg">📈</span>
                <div>
                  <div className="font-medium">Division 1</div>
                  <div className="text-xs text-gray-400">Wealth & Investments</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">1 agent</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-border/30 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-lg">💪</span>
                <div>
                  <div className="font-medium">Division 2</div>
                  <div className="text-xs text-gray-400">Health & Performance</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">1 agent</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-border/30 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-lg">📊</span>
                <div>
                  <div className="font-medium">Division 3</div>
                  <div className="text-xs text-gray-400">Business Intelligence</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">1 agent</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-border/30 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-lg">🏠</span>
                <div>
                  <div className="font-medium">Division 4</div>
                  <div className="text-xs text-gray-400">Personal & Household</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">1 agent</div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Overall Health</span>
              <span className="text-sm text-status-active">98.5% Operational</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Full Sync</span>
              <span className="text-sm text-gray-400">2 minutes ago</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Processes</span>
              <span className="text-sm text-gray-400">24</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Memory Usage</span>
              <span className="text-sm text-gray-400">2.1GB / 8GB</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Uptime</span>
              <span className="text-sm text-status-active">15 days, 4 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}