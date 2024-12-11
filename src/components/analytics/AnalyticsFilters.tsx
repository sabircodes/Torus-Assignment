import React from 'react';
import { useDispatch } from 'react-redux';
import { setDateRange, setRegion } from '../../store/slices/analyticsSlice';
import { format } from 'date-fns';
import { useAnalytics } from '../../hooks/useAnalytics';

export const AnalyticsFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { filters } = useAnalytics();

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    dispatch(setDateRange({
      ...filters.dateRange,
      [type]: new Date(value).toISOString()
    }));
  };

  const handleRegionChange = (region: string) => {
    dispatch(setRegion(region));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={format(new Date(filters.dateRange.start), 'yyyy-MM-dd')}
            onChange={(e) => handleDateRangeChange('start', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={format(new Date(filters.dateRange.end), 'yyyy-MM-dd')}
            onChange={(e) => handleDateRangeChange('end', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select
            value={filters.region}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Regions</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>
      </div>
    </div>
  );
};