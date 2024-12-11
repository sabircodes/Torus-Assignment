import React from 'react';
import { User } from '../types';
import { X } from 'lucide-react';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4">User Details</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <p className="mt-1 text-sm sm:text-base text-gray-900">{user.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-sm sm:text-base text-gray-900 break-all">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Status</label>
            <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {user.status}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Region</label>
            <p className="mt-1 text-sm sm:text-base text-gray-900">{user.region}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Registration Date</label>
            <p className="mt-1 text-sm sm:text-base text-gray-900">{user.registrationDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
