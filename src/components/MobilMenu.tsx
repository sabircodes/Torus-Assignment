import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';

export const MobileMenu: React.FC = () => {
  const { handleActiveTabChange } = useUsers();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="lg:hidden relative">
      <div className="cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>
        <div className="flex flex-col gap-1 justify-center items-center py-2">
          <div className={`w-6 h-1 bg-blue-500 ${isOpen ? "rotate-45":" "} origin-left ease-in-out duration-300`}></div>
          <div  className={`w-6 h-1 bg-blue-500 ${isOpen ? "opacity-0":" "} ease-in-out duration-300`}></div>
          <div  className={`w-6 h-1 bg-blue-500 ${isOpen ? "-rotate-45":" "} origin-left ease-in-out duration-300`}></div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
          <button 
            onClick={() => {
              handleActiveTabChange('users');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Users
          </button>
          <button 
            onClick={() => {
              handleActiveTabChange('analytics');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Analytics
          </button>
        </div>
      )}
    </div>
  );
};
