import { Bug, User, Project, Comment, DashboardMetrics } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Mohd. Hamza Hussain',
    email: 'hamza@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: 'developer'
  },
  {
    id: '3',
    name: 'Alex Chen',
    email: 'alex@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    role: 'qa'
  },
  {
    id: '4',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    role: 'manager'
  }
];

// Mock Projects
export const projects: Project[] = [
  {
    id: '1',
    name: 'Frontend Dashboard',
    description: 'Customer-facing dashboard with analytics features',
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-03-20T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'API Gateway',
    description: 'Main API gateway service for all client applications',
    createdAt: '2025-02-03T00:00:00.000Z',
    updatedAt: '2025-03-18T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Mobile App',
    description: 'Native mobile application for iOS and Android',
    createdAt: '2025-01-20T00:00:00.000Z',
    updatedAt: '2025-03-15T00:00:00.000Z'
  }
];

// Mock Comments
export const comments: Comment[] = [
  {
    id: '1',
    content: 'I have reproduced this issue on Chrome 118 and Firefox 104.',
    authorId: '3',
    bugId: '1',
    createdAt: '2025-03-18T14:22:00.000Z'
  },
  {
    id: '2',
    content: 'Looking into this now, will update soon.',
    authorId: '2',
    bugId: '1',
    createdAt: '2025-03-18T15:45:00.000Z'
  },
  {
    id: '3',
    content: 'Fixed in PR #342, please review when possible.',
    authorId: '2',
    bugId: '1',
    createdAt: '2025-03-19T09:12:00.000Z'
  },
  {
    id: '4',
    content: 'This seems like a critical issue for the upcoming release.',
    authorId: '4',
    bugId: '2',
    createdAt: '2025-03-17T11:32:00.000Z'
  }
];

// Mock Bugs
export const bugs: Bug[] = [
  {
    id: '1',
    title: 'Dashboard chart data not displaying correctly',
    description: 'The bar chart on the dashboard shows incorrect values when filtering by date range.',
    steps: '1. Go to dashboard\n2. Set date range to last 7 days\n3. Observe bar chart values',
    status: 'in-progress',
    priority: 'high',
    projectId: '1',
    reporterId: '3',
    assigneeId: '2',
    createdAt: '2025-03-18T10:30:00.000Z',
    updatedAt: '2025-03-19T09:15:00.000Z',
    comments: comments.filter(c => c.bugId === '1')
  },
  {
    id: '2',
    title: 'API authentication fails intermittently',
    description: 'Users are occasionally being logged out when making API calls even with valid tokens.',
    steps: '1. Log in to the application\n2. Make several API requests in succession\n3. Observe authentication failures',
    status: 'new',
    priority: 'critical',
    projectId: '2',
    reporterId: '4',
    assigneeId: null,
    createdAt: '2025-03-17T09:45:00.000Z',
    updatedAt: '2025-03-17T09:45:00.000Z',
    comments: comments.filter(c => c.bugId === '2')
  },
  {
    id: '3',
    title: 'Mobile app crashes on startup for Android 13',
    description: 'Users on Android 13 devices report the app immediately crashes when opening.',
    steps: '1. Install latest app version on Android 13 device\n2. Launch the app\n3. Observe immediate crash',
    status: 'new',
    priority: 'critical',
    projectId: '3',
    reporterId: '1',
    assigneeId: null,
    createdAt: '2025-03-16T14:22:00.000Z',
    updatedAt: '2025-03-16T14:22:00.000Z',
    comments: []
  },
  {
    id: '4',
    title: 'Data export feature generates corrupted CSV files',
    description: 'When exporting data as CSV, the resulting file has corrupted characters and misaligned columns.',
    steps: '1. Go to reporting section\n2. Select any data set\n3. Click export as CSV\n4. Open the downloaded file',
    status: 'resolved',
    priority: 'medium',
    projectId: '1',
    reporterId: '4',
    assigneeId: '2',
    createdAt: '2025-03-15T11:10:00.000Z',
    updatedAt: '2025-03-18T16:40:00.000Z',
    comments: []
  },
  {
    id: '5',
    title: 'User settings not saving properly',
    description: 'Changes to notification preferences do not persist after page reload.',
    steps: '1. Go to user settings\n2. Change notification preferences\n3. Save changes\n4. Reload the page',
    status: 'review',
    priority: 'low',
    projectId: '1',
    reporterId: '3',
    assigneeId: '2',
    createdAt: '2025-03-14T09:15:00.000Z',
    updatedAt: '2025-03-17T14:30:00.000Z',
    comments: []
  },
  {
    id: '6',
    title: 'Login page not responsive on mobile devices',
    description: 'The login form overflows and becomes unusable on screens smaller than 375px width.',
    steps: '1. Visit login page on mobile device\n2. Observe layout issues',
    status: 'closed',
    priority: 'medium',
    projectId: '1',
    reporterId: '1',
    assigneeId: '2',
    createdAt: '2025-03-10T10:00:00.000Z',
    updatedAt: '2025-03-12T16:45:00.000Z',
    comments: []
  }
];

// Dashboard metrics
export const dashboardMetrics: DashboardMetrics = {
  totalBugs: bugs.length,
  openBugs: bugs.filter(bug => ['new', 'in-progress', 'review'].includes(bug.status)).length,
  resolvedBugs: bugs.filter(bug => ['resolved', 'closed'].includes(bug.status)).length,
  criticalBugs: bugs.filter(bug => bug.priority === 'critical').length,
  byStatus: {
    'new': bugs.filter(bug => bug.status === 'new').length,
    'in-progress': bugs.filter(bug => bug.status === 'in-progress').length,
    'review': bugs.filter(bug => bug.status === 'review').length,
    'resolved': bugs.filter(bug => bug.status === 'resolved').length,
    'closed': bugs.filter(bug => bug.status === 'closed').length
  },
  byPriority: {
    'low': bugs.filter(bug => bug.priority === 'low').length,
    'medium': bugs.filter(bug => bug.priority === 'medium').length,
    'high': bugs.filter(bug => bug.priority === 'high').length,
    'critical': bugs.filter(bug => bug.priority === 'critical').length
  }
};

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

// Helper function to get bug by ID
export const getBugById = (id: string): Bug | undefined => {
  return bugs.find(bug => bug.id === id);
};