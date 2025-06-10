'use client';

import { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'View' | 'Admin';
  status: 'Active' | 'Inactive';
};

export default function Settings() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'View', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'View', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRoleChange = (userId: number, newRole: 'View' | 'Admin') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusChange = (userId: number, newStatus: 'Active' | 'Inactive') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setSelectedUser({
      id: Date.now(),
      name: '',
      email: '',
      role: 'View',
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedUser) {
      setUsers(prevUsers => {
        const exists = prevUsers.some(user => user.id === selectedUser.id);
        if (exists) {
          return prevUsers.map(user =>
            user.id === selectedUser.id ? selectedUser : user
          );
        } else {
          return [...prevUsers, selectedUser];
        }
      });
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <h3 className="text-3xl font-medium text-gray-700 dark:text-white">Settings</h3>
      
      {/* User Management Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-gray-700 dark:text-white">User Management</h4>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr 
                    key={user.id} 
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => openEditModal(user)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'Admin' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(user);
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop with fade-in animation */}
          <div 
            className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75 transition-opacity duration-300 ease-in-out"
            onClick={closeModal}
          ></div>
          
          {/* Modal with slide-in animation */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-100 opacity-100">
              {/* Modal Header */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit User Profile</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6">
                <div className="space-y-6">
                  {/* Profile Picture Section */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-full ring-4 ring-gray-200 dark:ring-gray-700"
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}&background=random`}
                        alt=""
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">{selectedUser.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.email}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        value={selectedUser.name}
                        onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={selectedUser.email}
                        onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                        <select
                          value={selectedUser.role}
                          onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value as 'View' | 'Admin'})}
                          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        >
                          <option value="View">View</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                        <select
                          value={selectedUser.status}
                          onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value as 'Active' | 'Inactive'})}
                          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-xl border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Settings Section */}
      <div className="mt-8">
        <h4 className="text-xl font-semibold text-gray-700 dark:text-white mb-6">System Settings</h4>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 