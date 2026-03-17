# Mission Control Dashboard

A Next.js dashboard for the Robbie Hunt HQ agent organization, featuring a clean, dark-mode interface inspired by Linear's design language.

## Features

### 🏠 Dashboard Home
- Overview cards showing agent status and quick stats
- Real-time system health monitoring
- Agent activity feed
- Mission statement display

### 📋 Task Board
- Kanban board with Backlog, In Progress, Review, Done columns
- Task creation modal with assignee selection
- Priority and due date management
- Live activity feed sidebar

### 📅 Calendar
- Visual monthly calendar view
- Scheduled cron jobs and proactive tasks
- Color-coded by division
- Event detail modals with task descriptions

### 📊 Projects
- Project tracker cards with progress bars
- Timeline view for project scheduling
- Milestone tracking and next actions
- Grid and timeline view modes

### 📚 Memory & Docs
- Searchable document repository
- Category filtering (Daily Briefs, Reports, etc.)
- Document preview modal
- Tag-based organization

### 👥 Team
- Organization chart visualization
- Agent status indicators (active, busy, idle)
- Division breakdown and system stats
- Mission statement highlight

### 🏢 The Office
- 2D pixel-art visualization of virtual office
- Interactive agent characters with animations
- Room layout for different divisions
- Real-time status indicators

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Design:** Linear-inspired dark mode

## Color Scheme

- Background: `#0A0A0A`
- Cards: `#1A1A1A`
- Borders: `#2A2A2A`
- Accent: `#7C3AED` (Purple)
- Status Colors:
  - Active: `#10B981` (Green)
  - Busy: `#F59E0B` (Yellow)
  - Idle: `#6B7280` (Gray)

## Agents

- **Leon King** (Human) - Leadership
- **Sentinel** (CEO Agent) - System Oversight
- **Renee Rivkin** (Division 1) - Wealth & Investments 📈
- **Greg Welch** (Division 2) - Health & Performance 💪
- **Adam Curwood** (Division 3) - Business Intelligence 📊
- **Shelley Vidikey** (Division 4) - Personal & Household 🏠

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mission-control/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── calendar/        # Calendar page
│   │   ├── memory/          # Documents & memory page
│   │   ├── office/          # Virtual office visualization
│   │   ├── projects/        # Projects tracker
│   │   ├── tasks/           # Task board
│   │   ├── team/            # Team & org chart
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Dashboard home
│   ├── components/          # Reusable components
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── TopBar.tsx       # Header with time
│   └── lib/
│       └── data.ts          # Mock data and types
├── data/                    # JSON data storage
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript config
└── next.config.js          # Next.js configuration
```

## Features Implementation

All pages are fully functional with mock data:

- ✅ Responsive design (desktop-first)
- ✅ Dark mode throughout
- ✅ Interactive components
- ✅ Real-time clock (AEST timezone)
- ✅ Smooth animations and transitions
- ✅ Task creation and management
- ✅ Document search and filtering
- ✅ Project timeline visualization
- ✅ Agent status monitoring
- ✅ 2D office with pixel art characters

## Data Structure

The application uses mock data structured for future API integration:

- **Tasks:** JSON-based with status tracking
- **Projects:** Progress tracking with milestones
- **Agents:** Status and current task monitoring
- **Documents:** Categorized with search metadata
- **Calendar Events:** Recurring schedule management

## Future Enhancements

- Real agent API integration
- Data persistence with database
- Real-time updates via WebSocket
- Agent communication interface
- Advanced reporting and analytics