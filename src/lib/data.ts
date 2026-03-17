export interface Agent {
  id: string
  name: string
  emoji: string
  division: string
  role: string
  status: 'active' | 'busy' | 'idle'
  currentTask?: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'backlog' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignedTo: string
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'in-progress' | 'review' | 'completed'
  progress: number
  assignedAgent: string
  startDate: Date
  endDate?: Date
  milestones: Array<{
    id: string
    title: string
    completed: boolean
    dueDate: Date
  }>
  nextAction: string
}

export interface ScheduledEvent {
  id: string
  title: string
  description: string
  time: string
  agent: string
  division: string
  type: 'daily' | 'weekly' | 'monthly'
  color: string
}

export interface ActivityFeedItem {
  id: string
  agent: string
  action: string
  timestamp: Date
  type: 'task' | 'project' | 'system'
}

export interface Document {
  id: string
  title: string
  category: 'Daily Briefs' | 'Weekly Reports' | 'Market Alerts' | 'Health Reports' | 'Business Intelligence'
  content: string
  author: string
  createdAt: Date
  tags: string[]
}

// Mock Data
export const agents: Agent[] = [
  {
    id: 'leon',
    name: 'Leon King',
    emoji: '👑',
    division: 'Leadership',
    role: 'Human',
    status: 'active',
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
    emoji: '🛡️',
    division: 'Leadership',
    role: 'CEO Agent',
    status: 'active',
    currentTask: 'Monitoring system performance',
  },
  {
    id: 'renee',
    name: 'Renee Rivkin',
    emoji: '📈',
    division: 'Division 1',
    role: 'Wealth & Investments',
    status: 'busy',
    currentTask: 'Analyzing market trends',
  },
  {
    id: 'greg',
    name: 'Greg Welch',
    emoji: '💪',
    division: 'Division 2',
    role: 'Health & Performance',
    status: 'active',
    currentTask: 'Generating health report',
  },
  {
    id: 'adam',
    name: 'Adam Curwood',
    emoji: '📊',
    division: 'Division 3',
    role: 'Business Intelligence',
    status: 'idle',
  },
  {
    id: 'shelley',
    name: 'Shelley Vidikey',
    emoji: '🏠',
    division: 'Division 4',
    role: 'Personal & Household',
    status: 'busy',
    currentTask: 'Planning renovation updates',
  },
]

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Market Analysis Report',
    description: 'Generate comprehensive market analysis for Q1',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'renee',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-16'),
    dueDate: new Date('2024-03-18'),
  },
  {
    id: '2',
    title: 'Health Dashboard Update',
    description: 'Update health metrics dashboard with new KPIs',
    status: 'backlog',
    priority: 'medium',
    assignedTo: 'greg',
    createdAt: new Date('2024-03-14'),
    updatedAt: new Date('2024-03-14'),
  },
  {
    id: '3',
    title: 'Business Intelligence Weekly',
    description: 'Compile weekly business intelligence brief',
    status: 'review',
    priority: 'medium',
    assignedTo: 'adam',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: '4',
    title: 'Renovation Schedule Optimization',
    description: 'Optimize timeline for Audrey Crescent renovation',
    status: 'done',
    priority: 'high',
    assignedTo: 'shelley',
    createdAt: new Date('2024-03-08'),
    updatedAt: new Date('2024-03-12'),
  },
]

export const mockProjects: Project[] = [
  {
    id: 'audrey-renovation',
    name: 'Audrey Crescent Renovation',
    description: 'Complete renovation of Audrey Crescent property',
    status: 'in-progress',
    progress: 65,
    assignedAgent: 'shelley',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-06-15'),
    milestones: [
      { id: '1', title: 'Permits Approved', completed: true, dueDate: new Date('2024-02-15') },
      { id: '2', title: 'Foundation Work', completed: true, dueDate: new Date('2024-03-01') },
      { id: '3', title: 'Electrical & Plumbing', completed: false, dueDate: new Date('2024-04-01') },
      { id: '4', title: 'Interior Finishing', completed: false, dueDate: new Date('2024-05-15') },
    ],
    nextAction: 'Coordinate electrical inspection',
  },
  {
    id: 'leyden-renovation',
    name: 'Leyden Avenue Renovation',
    description: 'Kitchen and bathroom renovation project',
    status: 'planning',
    progress: 25,
    assignedAgent: 'shelley',
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-08-30'),
    milestones: [
      { id: '1', title: 'Design Approval', completed: true, dueDate: new Date('2024-03-20') },
      { id: '2', title: 'Contractor Selection', completed: false, dueDate: new Date('2024-04-05') },
      { id: '3', title: 'Material Procurement', completed: false, dueDate: new Date('2024-04-20') },
    ],
    nextAction: 'Finalize contractor selection',
  },
  {
    id: 'chiropractic-automation',
    name: 'Wellbeing Chiropractic Automation',
    description: 'Automate appointment scheduling and patient management',
    status: 'in-progress',
    progress: 80,
    assignedAgent: 'adam',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-04-30'),
    milestones: [
      { id: '1', title: 'Requirements Analysis', completed: true, dueDate: new Date('2024-02-01') },
      { id: '2', title: 'System Integration', completed: true, dueDate: new Date('2024-03-01') },
      { id: '3', title: 'Testing & Optimization', completed: false, dueDate: new Date('2024-04-15') },
    ],
    nextAction: 'Complete user acceptance testing',
  },
]

export const scheduledEvents: ScheduledEvent[] = [
  {
    id: 'market-scan',
    title: 'Market Scan',
    description: 'Daily market analysis and opportunity identification',
    time: '09:30 AM',
    agent: 'Renee Rivkin',
    division: 'Division 1',
    type: 'daily',
    color: '#10B981',
  },
  {
    id: 'market-close',
    title: 'Market Close Summary',
    description: 'End of day market summary and position review',
    time: '04:15 PM',
    agent: 'Renee Rivkin',
    division: 'Division 1',
    type: 'daily',
    color: '#10B981',
  },
  {
    id: 'weekly-brief',
    title: 'Weekly Executive Brief',
    description: 'Comprehensive weekly summary for leadership',
    time: 'Sunday Evening',
    agent: 'Shelley Vidikey',
    division: 'Division 4',
    type: 'weekly',
    color: '#8B5CF6',
  },
  {
    id: 'bi-brief',
    title: 'Business Intelligence Brief',
    description: 'Weekly business intelligence and analytics report',
    time: 'Monday Morning',
    agent: 'Adam Curwood',
    division: 'Division 3',
    type: 'weekly',
    color: '#F59E0B',
  },
  {
    id: 'health-snapshot',
    title: 'Health Snapshot',
    description: 'Daily health metrics and wellness tracking',
    time: 'Daily',
    agent: 'Greg Welch',
    division: 'Division 2',
    type: 'daily',
    color: '#EF4444',
  },
]

export const activityFeed: ActivityFeedItem[] = [
  {
    id: '1',
    agent: 'Renee Rivkin',
    action: 'Completed market analysis for ASX200',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: 'task',
  },
  {
    id: '2',
    agent: 'Greg Welch',
    action: 'Updated health dashboard with latest metrics',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    type: 'system',
  },
  {
    id: '3',
    agent: 'Shelley Vidikey',
    action: 'Reviewed Audrey Crescent milestone progress',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    type: 'project',
  },
  {
    id: '4',
    agent: 'Adam Curwood',
    action: 'Generated business intelligence report',
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    type: 'task',
  },
  {
    id: '5',
    agent: 'Sentinel',
    action: 'System health check completed',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'system',
  },
]

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Daily Market Brief - March 16, 2024',
    category: 'Daily Briefs',
    content: 'ASX200 opened strong at 7,850 points, showing resilience after yesterday\'s volatility. Key sectors showing growth include technology (+2.3%) and healthcare (+1.8%). Notable movements in major holdings: CBA up 1.2%, BHP down 0.8%. Recommend monitoring energy sector for potential opportunities.',
    author: 'Renee Rivkin',
    createdAt: new Date('2024-03-16T09:45:00'),
    tags: ['market', 'asx', 'daily', 'analysis'],
  },
  {
    id: '2',
    title: 'Weekly Health Performance Report',
    category: 'Health Reports',
    content: 'Weekly health metrics show consistent improvement in sleep quality (avg 7.2h) and activity levels (12,500 daily steps average). Heart rate variability indicates good recovery. Recommend maintaining current exercise routine and considering meditation practice integration.',
    author: 'Greg Welch',
    createdAt: new Date('2024-03-15T18:30:00'),
    tags: ['health', 'performance', 'weekly', 'metrics'],
  },
  {
    id: '3',
    title: 'Business Intelligence Summary - Q1 2024',
    category: 'Business Intelligence',
    content: 'Q1 performance indicators show strong growth across all divisions. Revenue up 15% YoY, operational efficiency improved by 8%. Key focus areas for Q2: expansion of automation systems, optimization of workflow processes, and enhancement of predictive analytics capabilities.',
    author: 'Adam Curwood',
    createdAt: new Date('2024-03-14T14:20:00'),
    tags: ['business', 'intelligence', 'quarterly', 'performance'],
  },
]