import React from 'react';
import { User } from '../types';
import { Trash2, Eye } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';

interface UserTableProps {
  users: User[];
  onView: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onView }) => {
  const { handleDelete } = useUsers();

  return (
    <div className="w-full">
      {/* Desktop/Tablet View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.region}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-4">
                    <Eye className="w-5 h-5 text-blue-600 cursor-pointer" onClick={() => onView(user)} />
                    <Trash2 className="w-5 h-5 text-red-600 cursor-pointer" onClick={() => handleDelete(user.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4 px-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{user.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-2">{user.email}</div>
            <div className="text-sm text-gray-500 mb-3">{user.region}</div>
            <div className="flex justify-end gap-4">
              <Eye className="w-5 h-5 text-blue-600 cursor-pointer" onClick={() => onView(user)} />
              <Trash2 className="w-5 h-5 text-red-600 cursor-pointer" onClick={() => handleDelete(user.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};