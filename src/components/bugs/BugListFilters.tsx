import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { useApp } from '../../contexts/AppContext';
import { BugFilter } from '../../types';

interface BugListFiltersProps {
  onClose: () => void;
}

const BugListFilters: React.FC<BugListFiltersProps> = ({ onClose }) => {
  const { filter, setFilter, users, projects } = useApp();
  const [localFilter, setLocalFilter] = React.useState<BugFilter>(filter);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const values: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    
    setLocalFilter({
      ...localFilter,
      status: values as any[]
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const values: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    
    setLocalFilter({
      ...localFilter,
      priority: values as any[]
    });
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalFilter({
      ...localFilter,
      assigneeId: e.target.value || undefined
    });
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalFilter({
      ...localFilter,
      projectId: e.target.value || undefined
    });
  };

  const handleApplyFilters = () => {
    setFilter(localFilter);
    onClose();
  };

  const handleResetFilters = () => {
    setLocalFilter({});
    setFilter({});
    onClose();
  };

  return (
    <Card className="mb-4 animate-in fade-in duration-300">
      <CardHeader>
        <h3 className="text-lg font-medium">Filter Bugs</h3>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            multiple
            onChange={handleStatusChange}
            value={localFilter.status || []}
          >
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            multiple
            onChange={handlePriorityChange}
            value={localFilter.priority || []}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignee
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            onChange={handleAssigneeChange}
            value={localFilter.assigneeId || ''}
          >
            <option value="">All Assignees</option>
            <option value="unassigned">Unassigned</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            onChange={handleProjectChange}
            value={localFilter.projectId || ''}
          >
            <option value="">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-3">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BugListFilters;