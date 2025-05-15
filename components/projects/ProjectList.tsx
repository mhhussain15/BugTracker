import React from 'react';
import { Archive, Bug, ClipboardCheck } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { useApp } from '../../contexts/AppContext';
import { formatDate } from '../../utils/format';

const ProjectList: React.FC = () => {
  const { projects, bugs } = useApp();

  // Helper to count bugs per project
  const getBugCountByProject = (projectId: string) => {
    return bugs.filter(bug => bug.projectId === projectId).length;
  };

  // Helper to count open bugs per project
  const getOpenBugCountByProject = (projectId: string) => {
    return bugs.filter(bug => 
      bug.projectId === projectId && 
      ['new', 'in-progress', 'review'].includes(bug.status)
    ).length;
  };

  // Helper to count resolved bugs per project
  const getResolvedBugCountByProject = (projectId: string) => {
    return bugs.filter(bug => 
      bug.projectId === projectId && 
      ['resolved', 'closed'].includes(bug.status)
    ).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => {
        const totalBugs = getBugCountByProject(project.id);
        const openBugs = getOpenBugCountByProject(project.id);
        const resolvedBugs = getResolvedBugCountByProject(project.id);
        
        return (
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Created: {formatDate(project.createdAt)}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{project.description}</p>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                  <div className="p-2 rounded-full bg-gray-100 mb-2">
                    <Bug className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-500">Total</span>
                  <span className="font-bold">{totalBugs}</span>
                </div>
                
                <div className="flex flex-col items-center p-2 bg-yellow-50 rounded-md">
                  <div className="p-2 rounded-full bg-yellow-100 mb-2">
                    <Archive className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-xs text-gray-500">Open</span>
                  <span className="font-bold">{openBugs}</span>
                </div>
                
                <div className="flex flex-col items-center p-2 bg-green-50 rounded-md">
                  <div className="p-2 rounded-full bg-green-100 mb-2">
                    <ClipboardCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-500">Resolved</span>
                  <span className="font-bold">{resolvedBugs}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProjectList;