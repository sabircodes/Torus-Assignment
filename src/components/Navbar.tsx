import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../types';
import { useUsers } from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { LogOut } from 'lucide-react';
import { MobileMenu } from './MobilMenu';

export const Navbar: React.FC = () => {
  const { handleActiveTabChange, activeTab } = useUsers();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <nav>
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-[10%] py-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:space-x-8">
              <button
                onClick={() => handleActiveTabChange('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Users
              </button>

              <button
                onClick={() => handleActiveTabChange('analytics')}
                className={`${
                  activeTab === 'analytics'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile Menu - Only visible on small/medium screens */}
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
