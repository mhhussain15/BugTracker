import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, ArrowLeft, Clock, Megaphone } from 'lucide-react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useApp } from '../../contexts/AppContext';
import { getUserById, getProjectById } from '../../lib/mock-data';
import { getStatusColor, getPriorityColor, formatStatus, formatPriority, formatDate } from '../../utils/format';
import BugComments from './BugComments';
import BugStatusUpdate from './BugStatusUpdate';

const BugDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bugs, users, projects, setCurrentBugId } = useApp();
  const [bug, setBug] = useState(bugs.find(b => b.id === id));
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      setCurrentBugId(id);
      const foundBug = bugs.find(b => b.id === id);
      setBug(foundBug);
      
      if (!foundBug) {
        navigate('/bugs');
      }
    }
  }, [id, bugs, navigate, setCurrentBugId]);

  if (!bug) {
    return null;
  }

  const reporter = getUserById(bug.reporterId);
  const assignee = bug.assigneeId ? getUserById(bug.assigneeId) : null;
  const project = getProjectById(bug.projectId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/bugs')}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bugs
        </Button>
        
        <div className="space-x-3">
          <Button 
            variant="outline"
            onClick={() => setShowStatusUpdate(true)}
            className="flex items-center"
          >
            <Clock className="h-4 w-4 mr-2" />
            Update Status
          </Button>
          <Button 
            onClick={() => navigate(`/bugs/${bug.id}/edit`)}
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Bug
          </Button>
        </div>
      </div>

      {showStatusUpdate && (
        <BugStatusUpdate 
          bug={bug} 
          onClose={() => setShowStatusUpdate(false)} 
        />
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-2xl font-bold">{bug.title}</h1>
            <div className="flex space-x-3">
              <Badge 
                text={formatStatus(bug.status)} 
                className={`${getStatusColor(bug.status)} text-sm px-3 py-1`} 
              />
              <Badge 
                text={formatPriority(bug.priority)} 
                className={`${getPriorityColor(bug.priority)} text-sm px-3 py-1`} 
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1 col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="text-gray-900 whitespace-pre-line">{bug.description}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Project</h3>
                <p className="mt-1 text-gray-900">{project?.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reported By</h3>
                {reporter && (
                  <div className="mt-1 flex items-center">
                    <img 
                      src={reporter.avatar} 
                      alt={reporter.name} 
                      className="h-6 w-6 rounded-full mr-2"
                    />
                    <span>{reporter.name}</span>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assignee</h3>
                {assignee ? (
                  <div className="mt-1 flex items-center">
                    <img 
                      src={assignee.avatar} 
                      alt={assignee.name} 
                      className="h-6 w-6 rounded-full mr-2"
                    />
                    <span>{assignee.name}</span>
                  </div>
                ) : (
                  <p className="mt-1 text-gray-500">Unassigned</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created</h3>
                <p className="mt-1 text-gray-900">{formatDate(bug.createdAt)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Updated</h3>
                <p className="mt-1 text-gray-900">{formatDate(bug.updatedAt)}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Steps to Reproduce</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-900 whitespace-pre-line">{bug.steps}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <BugComments bug={bug} />
    </div>
  );
};

export default BugDetail;