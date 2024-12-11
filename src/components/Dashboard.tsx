import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchUsers } from '../store/slices/userSlice';
import { UserTable } from './UserTable';
import { UserModal } from './UserModal';
import { AnalyticsDashboard } from './analytics/AnalyticsDashboard';
import { Search } from 'lucide-react';
import { User } from '../types';
import { useUsers } from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';

import { AnalyticsFilters } from './analytics/AnalyticsFilters';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    users,
    loading,
    currentPage,
    searchTerm,
    handleSearch,
    handlePageChange,
    activeTab
  } = useUsers();
  // const [activeTab, setActiveTab] = useState<'users' | 'analytics'>('users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

 

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  );
  const totalPages = Math.ceil(filteredUsers.length / 5);

  return (
    <div className="min-h-screen bg-gray-100">
     

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'users' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <>
                <UserTable
                  users={paginatedUsers}
                  onView={(user) => setSelectedUser(user)}
                />
                <div className="flex justify-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <AnalyticsFilters />
            <AnalyticsDashboard />
          </>
        )}
      </main>

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};
