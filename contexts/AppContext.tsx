import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bug, User, Project, BugFilter } from '../types';
import { bugs as initialBugs, users, projects } from '../lib/mock-data';

interface AppContextType {
  bugs: Bug[];
  users: User[];
  projects: Project[];
  currentUser: User;
  currentBugId: string | null;
  filter: BugFilter;
  setCurrentBugId: (id: string | null) => void;
  setFilter: (filter: BugFilter) => void;
  addBug: (bug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateBug: (id: string, updates: Partial<Bug>) => void;
  addComment: (bugId: string, content: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bugsState, setBugs] = useState<Bug[]>(initialBugs);
  const [currentBugId, setCurrentBugId] = useState<string | null>(null);
  const [filter, setFilter] = useState<BugFilter>({});

  // Default to first user as current user (in a real app, this would come from auth)
  const currentUser = users[0];

  const addBug = (newBug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const now = new Date().toISOString();
    const bug: Bug = {
      ...newBug,
      id: `${bugsState.length + 1}`,
      createdAt: now,
      updatedAt: now,
      comments: []
    };
    
    setBugs([...bugsState, bug]);
  };

  const updateBug = (id: string, updates: Partial<Bug>) => {
    setBugs(bugsState.map(bug => 
      bug.id === id 
        ? { ...bug, ...updates, updatedAt: new Date().toISOString() } 
        : bug
    ));
  };

  const addComment = (bugId: string, content: string) => {
    const now = new Date().toISOString();
    const comment = {
      id: `comment-${Date.now()}`,
      content,
      authorId: currentUser.id,
      bugId,
      createdAt: now
    };

    setBugs(bugsState.map(bug => 
      bug.id === bugId 
        ? { 
            ...bug, 
            comments: [...bug.comments, comment],
            updatedAt: now
          } 
        : bug
    ));
  };

  return (
    <AppContext.Provider
      value={{
        bugs: bugsState,
        users,
        projects,
        currentUser,
        currentBugId,
        filter,
        setCurrentBugId,
        setFilter,
        addBug,
        updateBug,
        addComment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};