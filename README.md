# BugTracker - Advanced Bug Tracking System

A comprehensive bug tracking and project management system built with React, TypeScript, and Tailwind CSS.

**Developed by Mohd. Hamza Hussain**

##  Live Demo

Visit the live application: [https://stellar-dodol-167e63.netlify.app](https://stellar-dodol-167e63.netlify.app)

##  Features

### Core Functionality
- **Dashboard Overview**: Real-time metrics and bug statistics with visual charts
- **Bug Management**: Create, edit, view, and track bugs through their lifecycle
- **Advanced Filtering**: Filter bugs by status, priority, assignee, and project
- **Search Functionality**: Quick search across bug titles and descriptions
- **Comment System**: Collaborative discussion on bug reports
- **Status Workflow**: Structured bug lifecycle (New → In Progress → Review → Resolved → Closed)
- **Project Organization**: Organize bugs by projects with dedicated project views
- **User Assignment**: Assign bugs to team members with role-based access

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with consistent design system
- **Real-time Updates**: Instant feedback and status updates
- **Intuitive Navigation**: Easy-to-use navigation with breadcrumbs and clear hierarchy
- **Visual Indicators**: Color-coded status and priority badges for quick identification

##  Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router DOM for navigation
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Deployment**: Netlify for hosting

##  Architecture

The application follows a modular architecture with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, Input, etc.)
│   ├── bugs/           # Bug-specific components
│   ├── dashboard/      # Dashboard components
│   ├── layout/         # Layout components
│   └── projects/       # Project components
├── contexts/           # React Context for state management
├── lib/               # Mock data and utilities
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

##  Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bugtracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

##  Project Structure

### Key Components

#### Dashboard
- **DashboardCards**: Overview metrics (Total, Open, Resolved, Critical bugs)
- **StatusBreakdown**: Visual breakdown of bugs by status
- **PriorityChart**: Priority distribution visualization
- **RecentBugs**: Latest bug reports with quick access

#### Bug Management
- **BugList**: Comprehensive bug listing with filtering and search
- **BugDetail**: Detailed bug view with full information and comments
- **BugForm**: Create and edit bug reports with validation
- **BugComments**: Collaborative comment system
- **BugStatusUpdate**: Quick status and assignee updates

#### Project Management
- **ProjectList**: Overview of all projects with bug statistics

### State Management
The application uses React Context for state management, providing:
- Bug data management
- User authentication simulation
- Filter state management
- Real-time updates

##  Design System

### Color Palette
- **Primary**: Blue (#1E40AF) - Navigation and primary actions
- **Secondary**: Teal (#0D9488) - Secondary actions and accents
- **Status Colors**: 
  - New: Blue (#3B82F6)
  - In Progress: Yellow (#EAB308)
  - Review: Purple (#8B5CF6)
  - Resolved: Green (#10B981)
  - Closed: Gray (#6B7280)
- **Priority Colors**:
  - Low: Green (#10B981)
  - Medium: Blue (#3B82F6)
  - High: Orange (#F97316)
  - Critical: Red (#EF4444)

### Typography
- Consistent font hierarchy with 3 weight variations
- Readable line spacing (150% for body, 120% for headings)
- Clear visual hierarchy for information organization

### Spacing
- 8px spacing system for consistent layouts
- Proper alignment and visual balance
- Responsive breakpoints for all screen sizes

##  Customization

### Adding New Bug Statuses
1. Update the `Bug['status']` type in `src/types/index.ts`
2. Add corresponding colors in `src/utils/format.ts`
3. Update status options in form components

### Adding New Priority Levels
1. Update the `Bug['priority']` type in `src/types/index.ts`
2. Add corresponding colors in `src/utils/format.ts`
3. Update priority options in form components

### Extending User Roles
1. Update the `User['role']` type in `src/types/index.ts`
2. Implement role-based permissions in components
3. Update mock data with new roles

##  Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Collapsible navigation menu on mobile
- Responsive grid layouts
- Touch-friendly interface elements
- Optimized content hierarchy for smaller screens

##  Security Considerations

While this is a demo application with mock data, it includes:
- Input validation on all forms
- XSS prevention through proper data handling
- Type safety with TypeScript
- Secure routing patterns

##  Deployment

The application is deployed on Netlify with automatic builds from the main branch.

### Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  Developer

**Mohd. Hamza Hussain**
- Professional Full-Stack Developer
- Specialized in React, TypeScript, and Modern Web Technologies

##  Acknowledgments

- React team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- Netlify for seamless deployment

---

*Built with ❤️ by Mohd. Hamza Hussain*
