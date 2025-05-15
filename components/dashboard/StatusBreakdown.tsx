import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { dashboardMetrics } from '../../lib/mock-data';

const statusColors = {
  'new': 'bg-blue-500',
  'in-progress': 'bg-yellow-500',
  'review': 'bg-purple-500',
  'resolved': 'bg-green-500',
  'closed': 'bg-gray-500'
};

const StatusBreakdown: React.FC = () => {
  const { byStatus } = dashboardMetrics;
  const totalBugs = Object.values(byStatus).reduce((sum, count) => sum + count, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-medium">Status Breakdown</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(byStatus).map(([status, count]) => {
            const percentage = Math.round((count / totalBugs) * 100);
            return (
              <div key={status} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{status.replace('-', ' ')}</span>
                  <span className="font-medium">{count} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`${statusColors[status as keyof typeof statusColors]} h-2 rounded-full`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusBreakdown;