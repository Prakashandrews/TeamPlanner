'use client';

import { useState } from 'react';

// --- User Management Section (existing) ---
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
    <div className="p-6 space-y-8">
      <h3 className="text-3xl font-medium text-gray-700 dark:text-white mb-8">Settings</h3>

      {/* User Management Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-gray-700 dark:text-white">User Management</h4>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add User
          </button>
        </div>
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
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
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
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'}`}>{user.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>{user.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4">Edit</button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile & Preferences Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h4 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Profile & Preferences</h4>
        <div className="text-gray-500 dark:text-gray-400">Update your profile, change your password, and set your notification preferences. (Coming soon)</div>
      </div>

      {/* Team Settings Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h4 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Team Settings</h4>
        <div className="text-gray-500 dark:text-gray-400">Manage team names, capacity, and other team-wide settings. (Coming soon)</div>
      </div>

      {/* Integrations Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h4 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Integrations</h4>
        <div className="text-gray-500 dark:text-gray-400">Connect to external tools and manage API keys. (Coming soon)</div>
      </div>

      {/* Security Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h4 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Security</h4>
        <div className="text-gray-500 dark:text-gray-400">Change your password, enable 2FA, and manage security settings. (Coming soon)</div>
      </div>

      {/* Danger Zone Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h4 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h4>
        <div className="text-red-500 dark:text-red-400">Delete your account or reset all data. (Coming soon)</div>
      </div>
    </div>
  );
} 