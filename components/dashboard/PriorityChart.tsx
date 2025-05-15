import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { dashboardMetrics } from '../../lib/mock-data';

const priorityColors = {
  'low': 'bg-green-500',
  'medium': 'bg-blue-500',
  'high': 'bg-orange-500',
  'critical': 'bg-red-500'
};

const PriorityChart: React.FC = () => {
  const { byPriority } = dashboardMetrics;
  const totalBugs = Object.values(byPriority).reduce((sum, count) => sum + count, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-medium">Priority Breakdown</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(byPriority).map(([priority, count]) => {
            const percentage = Math.round((count / totalBugs) * 100);
            return (
              <div key={priority} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{priority}</span>
                  <span className="font-medium">{count} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`${priorityColors[priority as keyof typeof priorityColors]} h-2 rounded-full`} 
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

export default PriorityChart;