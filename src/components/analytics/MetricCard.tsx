import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  Icon: LucideIcon;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, Icon, color }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <Icon className={`h-6 w-6 md:h-8 md:w-8 ${color}`} />
        <div className="ml-4">
          <p className="text-xs md:text-sm text-gray-500">{title}</p>
          <p className="text-xl md:text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};