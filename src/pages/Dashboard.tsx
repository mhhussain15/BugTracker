import React from 'react';
import DashboardCards from '../components/dashboard/DashboardCards';
import StatusBreakdown from '../components/dashboard/StatusBreakdown';
import PriorityChart from '../components/dashboard/PriorityChart';
import RecentBugs from '../components/dashboard/RecentBugs';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardCards />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusBreakdown />
        <PriorityChart />
      </div>
      
      <RecentBugs />
    </div>
  );
};

export default Dashboard;