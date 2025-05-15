import React, { useState } from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { Bug } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface BugStatusUpdateProps {
  bug: Bug;
  onClose: () => void;
}

const BugStatusUpdate: React.FC<BugStatusUpdateProps> = ({ bug, onClose }) => {
  const { updateBug, addComment, users } = useApp();
  const [status, setStatus] = useState<Bug['status']>(bug.status);
  const [assigneeId, setAssigneeId] = useState<string | null>(bug.assigneeId);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ];

  const assigneeOptions = [
    { value: '', label: 'Unassigned' },
    ...users.map(user => ({ value: user.id, label: user.name }))
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      updateBug(bug.id, {
        status,
        assigneeId
      });
      
      if (comment.trim()) {
        const statusChange = bug.status !== status 
          ? `Changed status from ${bug.status} to ${status}.` 
          : '';
        
        const assigneeChange = bug.assigneeId !== assigneeId
          ? `Changed assignee.` 
          : '';
        
        const statusComment = [statusChange, assigneeChange, comment]
          .filter(Boolean)
          .join(' ');
        
        addComment(bug.id, statusComment);
      }
      
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <Card className="mb-4 animate-in fade-in duration-300">
      <CardHeader>
        <h3 className="text-lg font-medium">Update Bug Status</h3>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Bug['status'])}
            options={statusOptions}
          />
          
          <Select
            label="Assignee"
            value={assigneeId || ''}
            onChange={(e) => setAssigneeId(e.target.value || null)}
            options={assigneeOptions}
          />
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Comment (optional)
            </label>
            <textarea
              id="comment"
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Add a comment about this status change..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BugStatusUpdate;