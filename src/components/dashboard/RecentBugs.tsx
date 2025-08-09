import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { bugs } from '../../lib/mock-data';
import { getStatusColor, getPriorityColor, formatStatus, formatPriority, formatDate } from '../../utils/format';

const RecentBugs: React.FC = () => {
  const navigate = useNavigate();
  // Sort bugs by created date (newest first) and take the first 5
  const recentBugs = [...bugs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Bugs</h3>
        <button 
          onClick={() => navigate('/bugs')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          View all
        </button>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200">
          {recentBugs.map((bug) => (
            <div 
              key={bug.id}
              className="py-3 flex items-center justify-between hover:bg-gray-50 rounded-md px-2 cursor-pointer transition-colors duration-150"
              onClick={() => navigate(`/bugs/${bug.id}`)}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{bug.title}</p>
                <div className="mt-1 flex items-center space-x-2">
                  <Badge 
                    text={formatStatus(bug.status)} 
                    className={getStatusColor(bug.status)} 
                  />
                  <Badge 
                    text={formatPriority(bug.priority)} 
                    className={getPriorityColor(bug.priority)} 
                  />
                  <span className="text-xs text-gray-500">{formatDate(bug.createdAt)}</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBugs;