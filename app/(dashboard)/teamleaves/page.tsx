"use client";
import { useState } from 'react';

const LEAVE_REASONS = ['Sick Leave', 'Vacation', 'Personal', 'Work From Home', 'Other'];
const LEAVE_TYPES = ['Full Day', 'Half Day', 'Multiple Days'];
const LEAVE_STATUSES = ['Pending', 'Approved', 'Rejected', 'Cancelled'];
const MEMBER_NAMES = Array.from({ length: 10 }, (_, i) => `Member ${i + 1}`);

interface LeaveEntry {
  member: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  approvedBy: string;
  notes: string;
}

const EXAMPLE_LEAVES: LeaveEntry[] = Array.from({ length: 30 }, (_, i) => ({
  member: MEMBER_NAMES[i % MEMBER_NAMES.length],
  leaveType: LEAVE_TYPES[i % LEAVE_TYPES.length],
  startDate: `2024-${((i % 12) + 1).toString().padStart(2, '0')}-${((i % 28) + 1).toString().padStart(2, '0')}`,
  endDate: `2024-${((i % 12) + 1).toString().padStart(2, '0')}-${((i % 28) + 3).toString().padStart(2, '0')}`,
  reason: LEAVE_REASONS[i % LEAVE_REASONS.length],
  status: LEAVE_STATUSES[i % LEAVE_STATUSES.length],
  approvedBy: i % 3 === 0 ? 'Manager A' : i % 3 === 1 ? 'Manager B' : 'HR Manager',
  notes: i % 2 === 0 ? 'Family emergency' : i % 2 === 1 ? 'Annual vacation' : 'Medical appointment'
}));

export default function TeamLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveEntry[]>(EXAMPLE_LEAVES);
  const [form, setForm] = useState<LeaveEntry>({ 
    member: '', 
    leaveType: LEAVE_TYPES[0],
    startDate: '', 
    endDate: '',
    reason: LEAVE_REASONS[0],
    status: 'Pending',
    approvedBy: '',
    notes: ''
  });
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageSize = 10;
  const totalPages = Math.ceil(leaves.length / pageSize);
  const paginated = leaves.slice((page - 1) * pageSize, page * pageSize);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaves([...leaves, form]);
    setForm({ 
      member: '', 
      leaveType: LEAVE_TYPES[0],
      startDate: '', 
      endDate: '',
      reason: LEAVE_REASONS[0],
      status: 'Pending',
      approvedBy: '',
      notes: ''
    });
    setPage(totalPages + 1);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({ 
      member: '', 
      leaveType: LEAVE_TYPES[0],
      startDate: '', 
      endDate: '',
      reason: LEAVE_REASONS[0],
      status: 'Pending',
      approvedBy: '',
      notes: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Rejected': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'Pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'Cancelled': return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Full Day': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'Half Day': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'Multiple Days': return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">Team Leaves</h1>
        <button 
          onClick={openModal}
          className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Leave
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Leave Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Approved By</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginated.map((leave, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(leave.member)}&background=random`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{leave.member}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {leave.startDate === leave.endDate ? leave.startDate : `${leave.startDate} to ${leave.endDate}`}
                    </div>
                    {leave.notes && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs" title={leave.notes}>
                        {leave.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getLeaveTypeColor(leave.leaveType)}`}>
                      {leave.leaveType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{leave.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{leave.approvedBy || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>

      {/* Add Leave Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75 transition-opacity duration-300 ease-in-out"
            onClick={closeModal}
          ></div>
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Leave</h3>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Member</label>
                      <select
                        name="member"
                        value={form.member}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      >
                        <option value="">Select a team member</option>
                        {MEMBER_NAMES.map((member) => (
                          <option key={member} value={member}>{member}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type</label>
                      <select
                        name="leaveType"
                        value={form.leaveType}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      >
                        {LEAVE_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                      <input
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        type="date"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                      <input
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        type="date"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason</label>
                      <select
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      >
                        {LEAVE_REASONS.map((reason) => (
                          <option key={reason} value={reason}>{reason}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      >
                        {LEAVE_STATUSES.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Approved By</label>
                      <input
                        name="approvedBy"
                        value={form.approvedBy}
                        onChange={handleChange}
                        placeholder="Enter approver name"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Enter additional notes or comments"
                      rows={3}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    />
                  </div>
                </form>
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
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Add Leave
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 