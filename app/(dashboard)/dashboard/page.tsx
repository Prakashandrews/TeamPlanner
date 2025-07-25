"use client";
import { useState } from "react";

// Placeholder data
const SUMMARY = {
  members: 30,
  onLeave: 3,
  features: 12,
};
const UPCOMING_LEAVES = [
  { name: "Member 2", date: "2024-07-10", reason: "Vacation" },
  { name: "Member 5", date: "2024-07-12", reason: "Sick Leave" },
  { name: "Member 8", date: "2024-07-13", reason: "Personal" },
];
const RECENT_ACTIVITY = [
  { type: "member", text: "Added Member 31" },
  { type: "leave", text: "Leave added for Member 5" },
  { type: "feature", text: "Feature 'API Gateway' moved to Q3" },
];
const TEAM_OVERVIEW = Array.from({ length: 5 }, (_, i) => ({
  name: `Member ${i + 1}`,
  status: i === 1 ? "On Leave" : "Active",
  role: i % 2 === 0 ? "Developer" : "QA",
}));

export default function DashboardPage() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section for First-Time Users */}
      {showWelcome && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1">
                             <h1 className="text-2xl font-bold mb-2">Welcome to TeamSpace! 👋</h1>
              <p className="text-indigo-100 mb-4">Get started with managing your team efficiently. Here's what you can do:</p>
              
              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Team Members</h3>
                  </div>
                  <p className="text-sm text-indigo-100">Add and manage your team members with detailed profiles</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Team Leaves</h3>
                  </div>
                  <p className="text-sm text-indigo-100">Track leave requests and manage team availability</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Team Planning</h3>
                  </div>
                  <p className="text-sm text-indigo-100">Plan features and track team capacity by quarters</p>
                </div>
              </div>
              
              {/* Getting Started Steps */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h3 className="font-semibold mb-3">Getting Started:</h3>
                <ol className="text-sm text-indigo-100 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Add your team members in the <strong>Team Members</strong> tab</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Set up leave tracking in the <strong>Team Leaves</strong> tab</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Plan your features and track capacity in <strong>Team Planning</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Configure your preferences in <strong>Settings</strong></span>
                  </li>
                </ol>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setShowWelcome(false)}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-indigo-600">{SUMMARY.members}</span>
          <span className="mt-2 text-gray-700 dark:text-gray-200">Team Members</span>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-pink-600">{SUMMARY.onLeave}</span>
          <span className="mt-2 text-gray-700 dark:text-gray-200">On Leave Today</span>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-green-600">{SUMMARY.features}</span>
          <span className="mt-2 text-gray-700 dark:text-gray-200">Features In Progress</span>
        </div>
      </div>

      {/* Upcoming Leaves & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Upcoming Leaves</h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {UPCOMING_LEAVES.map((leave, idx) => (
              <li key={idx} className="py-2 flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-white">{leave.name}</span>
                <span className="text-gray-500 dark:text-gray-400">{leave.date}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">{leave.reason}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Recent Activity</h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {RECENT_ACTIVITY.map((item, idx) => (
              <li key={idx} className="py-2 flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${item.type === "member" ? "bg-indigo-500" : item.type === "leave" ? "bg-pink-500" : "bg-green-500"}`}></span>
                <span className="text-gray-700 dark:text-gray-200">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Team Overview Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Team Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {TEAM_OVERVIEW.map((member, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === "Active" ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200"}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 