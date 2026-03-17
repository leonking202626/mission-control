import { agents, mockTasks, mockProjects, activityFeed } from '@/lib/data'
import { Activity, Users, CheckSquare, FolderKanban, TrendingUp } from 'lucide-react'

function StatCard({ title, value, subtitle, icon: Icon, trend }: {
  title: string
  value: string | number
  subtitle?: string
  icon: any
  trend?: 'up' | 'down' | 'neutral'
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold mt-2">{value}</p>
            {trend && (
              <TrendingUp 
                className={`w-4 h-4 ${
                  trend === 'up' ? 'text-status-active' : 
                  trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`} 
              />
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className="w-8 h-8 text-accent" />
      </div>
    </div>
  )
}

function AgentStatusCard({ agent }: { agent: any }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{agent.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{agent.name}</h3>
            <div className={`status-dot status-${agent.status}`} />
          </div>
          <p className="text-xs text-gray-400">{agent.role}</p>
          {agent.currentTask && (
            <p className="text-xs text-gray-500 mt-1">{agent.currentTask}</p>
          )}
        </div>
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
    <div className="flex items-start gap-3 p-3 hover:bg-border/50 rounded-lg transition-colors">
      <div className="w-2 h-2 bg-accent rounded-full mt-2" />
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

export default function Dashboard() {
  const activeAgents = agents.filter(a => a.status === 'active').length
  const tasksInProgress = mockTasks.filter(t => t.status === 'in-progress').length
  const completedTasks = mockTasks.filter(t => t.status === 'done').length
  const activeProjects = mockProjects.filter(p => p.status === 'in-progress').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Mission Control Dashboard</h1>
        <p className="text-gray-400">Overview of agent operations and system status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Agents"
          value={activeAgents}
          subtitle={`${agents.length} total agents`}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Tasks in Progress"
          value={tasksInProgress}
          subtitle={`${completedTasks} completed today`}
          icon={CheckSquare}
          trend="neutral"
        />
        <StatCard
          title="Active Projects"
          value={activeProjects}
          subtitle={`${mockProjects.length} total projects`}
          icon={FolderKanban}
          trend="up"
        />
        <StatCard
          title="System Health"
          value="98.5%"
          subtitle="All systems operational"
          icon={Activity}
          trend="up"
        />
      </div>

      {/* Agent Status and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Agent Status */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Agent Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.slice(1).map((agent) => (
              <AgentStatusCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="card p-4 space-y-2 max-h-96 overflow-y-auto">
            {activityFeed.map((item) => (
              <ActivityItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="card p-6 bg-gradient-to-r from-accent/10 to-purple-600/10 border border-accent/20">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Mission Statement</h2>
          <p className="text-gray-300 text-lg italic">
            "Build an autonomous organization of AI agents that do work for me and produce value 24/7."
          </p>
        </div>
      </div>
    </div>
  )
}