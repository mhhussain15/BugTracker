import React from 'react';
import { Bug, Lightbulb as BugLightbulb, Clock, CheckCircle2 } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import { dashboardMetrics } from '../../lib/mock-data';

const DashboardCards: React.FC = () => {
  const metrics = [
    {
      title: 'Total Bugs',
      value: dashboardMetrics.totalBugs,
      icon: <Bug className="h-6 w-6 text-blue-500" />,
      color: 'bg-blue-50 border-blue-100',
    },
    {
      title: 'Open Bugs',
      value: dashboardMetrics.openBugs,
      icon: <BugLightbulb className="h-6 w-6 text-yellow-500" />,
      color: 'bg-yellow-50 border-yellow-100',
    },
    {
      title: 'Resolved',
      value: dashboardMetrics.resolvedBugs,
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
      color: 'bg-green-50 border-green-100',
    },
    {
      title: 'Critical',
      value: dashboardMetrics.criticalBugs,
      icon: <Clock className="h-6 w-6 text-red-500" />,
      color: 'bg-red-50 border-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <Card key={index} className={`border ${metric.color} transition-all duration-300 hover:shadow-lg`}>
          <CardContent className="flex items-center">
            <div className="p-3 rounded-full bg-white mr-4 shadow-sm">
              {metric.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <p className="text-3xl font-bold">{metric.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;