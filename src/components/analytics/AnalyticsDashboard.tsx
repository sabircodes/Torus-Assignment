import React, { useMemo } from 'react';
import { Users, UserCheck, UserMinus } from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { useAnalytics } from '../../hooks/useAnalytics';
import { MetricCard } from './MetricCard';

// Color palette for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AnalyticsDashboard: React.FC = () => {
  const { metrics, filters } = useAnalytics();
  console.log(filters);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const start_month = months[new Date(filters.dateRange.start).getUTCMonth()];
  const end_month = months[new Date(filters.dateRange.end).getUTCMonth()];

  const curr_region = filters.region;

  // Memoized chart data to prevent unnecessary recalculations
  // months[Math.floor(Math.random() * months.length)] this is to get random month from months arr
  const registrationData = useMemo(
    () => [
      {
        month: 'January',
        users: Math.floor(Math.random() * 100),
      },
      { month: 'February', users: Math.floor(Math.random() * 100) },
      { month: 'March', users: Math.floor(Math.random() * 100) },
      { month: 'April', users: Math.floor(Math.random() * 100) },
      { month: 'May', users: Math.floor(Math.random() * 100) },
      { month: 'June', users: Math.floor(Math.random() * 100) },
      { month: start_month, users: Math.floor(Math.random() * 100) },
      { month: end_month, users: Math.floor(Math.random() * 100 - 10) },
    ],
    [start_month, end_month]
  );

  const statusData = useMemo(
    () => [
      { name: 'Active', value: metrics.activeUsers },
      { name: 'Inactive', value: metrics.totalUsers - metrics.activeUsers },
    ],
    [metrics.activeUsers, metrics.totalUsers]
  );
  console.log(curr_region);
  const regionData = useMemo(
    () =>{ 
     const data = [
      { region: 'North', users: Math.floor(Math.random() * 100) },
      { region: 'South', users: Math.floor(Math.random() * 100) },
      { region: 'East', users: Math.floor(Math.random() * 100) },
      { region: 'West', users: Math.floor(Math.random() * 100) },
     ]
     return curr_region === 'all' ? data : data.filter(item=> item.region === curr_region);
    },
    [curr_region]
  );

  return (
    <div className="p-2 sm:p-4 md:p-6">
      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers}
          Icon={Users}
          color="text-blue-500"
        />
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          Icon={UserCheck}
          color="text-green-500"
        />
        <MetricCard
          title="Deleted Users"
          value={metrics.deletedUsers}
          Icon={UserMinus}
          color="text-red-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 md:gap-8 ">
        {/* User Registration Trend Chart */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-base md:text-lg font-semibold mb-4">
            User Registration Trend
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <LineChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active vs Inactive Users Chart */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-base md:text-lg font-semibold mb-4">
            Active vs Inactive Users
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {statusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users by Region Chart */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md lg:col-span-2">
          <h3 className="text-base md:text-lg font-semibold mb-4">
            Users by Region
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
