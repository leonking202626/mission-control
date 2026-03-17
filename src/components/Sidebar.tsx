'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  FolderKanban, 
  FileText, 
  Users, 
  Building2 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Memory', href: '/memory', icon: FileText },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Office', href: '/office', icon: Building2 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold">Mission Control</h1>
        <p className="text-sm text-gray-400 mt-1">Robbie Hunt HQ</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-accent text-white' 
                  : 'text-gray-300 hover:bg-border hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            🛡️
          </div>
          <div>
            <p className="text-sm font-medium">Sentinel</p>
            <p className="text-xs text-gray-400">CEO Agent</p>
          </div>
        </div>
      </div>
    </div>
  )
}