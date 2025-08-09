import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useApp } from '../../contexts/AppContext';
import { getStatusColor, getPriorityColor, formatStatus, formatPriority, formatDate } from '../../utils/format';
import { getUserById, getProjectById } from '../../lib/mock-data';
import BugListFilters from './BugListFilters';

const BugList: React.FC = () => {
  const { bugs, filter, setCurrentBugId } = useApp();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Apply filters and search
  const filteredBugs = bugs.filter(bug => {
    let matches = true;
    
    // Filter by status
    if (filter.status && filter.status.length > 0) {
      matches = matches && filter.status.includes(bug.status);
    }
    
    // Filter by priority
    if (filter.priority && filter.priority.length > 0) {
      matches = matches && filter.priority.includes(bug.priority);
    }
    
    // Filter by assignee
    if (filter.assigneeId) {
      matches = matches && bug.assigneeId === filter.assigneeId;
    }
    
    // Filter by project
    if (filter.projectId) {
      matches = matches && bug.projectId === filter.projectId;
    }
    
    // Search
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      matches = matches && (
        bug.title.toLowerCase().includes(term) || 
        bug.description.toLowerCase().includes(term)
      );
    }
    
    return matches;
  });

  const handleBugClick = (bugId: string) => {
    setCurrentBugId(bugId);
    navigate(`/bugs/${bugId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search bugs..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button 
            onClick={() => navigate('/bugs/new')}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Bug
          </Button>
        </div>
      </div>

      {showFilters && <BugListFilters onClose={() => setShowFilters(false)} />}

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">All Bugs ({filteredBugs.length})</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bug
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBugs.length > 0 ? (
                  filteredBugs.map((bug) => {
                    const assignee = bug.assigneeId ? getUserById(bug.assigneeId) : null;
                    const project = getProjectById(bug.projectId);
                    
                    return (
                      <tr 
                        key={bug.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                        onClick={() => handleBugClick(bug.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{bug.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {bug.description.length > 60 
                              ? `${bug.description.substring(0, 60)}...` 
                              : bug.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            text={formatStatus(bug.status)} 
                            className={getStatusColor(bug.status)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            text={formatPriority(bug.priority)} 
                            className={getPriorityColor(bug.priority)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{project?.name || 'Unknown'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {assignee ? (
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <img 
                                  className="h-8 w-8 rounded-full" 
                                  src={assignee.avatar} 
                                  alt={assignee.name} 
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{assignee.name}</div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Unassigned</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(bug.createdAt)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No bugs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BugList;