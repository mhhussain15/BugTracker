export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'developer' | 'qa' | 'manager' | 'viewer';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  steps: string;
  status: 'new' | 'in-progress' | 'review' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  projectId: string;
  reporterId: string;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  bugId: string;
  createdAt: string;
}

export interface BugFilter {
  status?: Bug['status'][];
  priority?: Bug['priority'][];
  assigneeId?: string;
  projectId?: string;
  search?: string;
}

export interface DashboardMetrics {
  totalBugs: number;
  openBugs: number;
  resolvedBugs: number;
  criticalBugs: number;
  byStatus: Record<Bug['status'], number>;
  byPriority: Record<Bug['priority'], number>;
}