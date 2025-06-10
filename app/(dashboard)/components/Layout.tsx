'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex h-screen">
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden text-gray-400"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out bg-[#181D2F] shadow-lg ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 rounded-tr-2xl rounded-br-2xl flex flex-col`}>
        {/* Logo and App Name */}
        <div className="flex items-center px-8 py-8 bg-[#13172B] rounded-tr-2xl">
          {/* Profile Icon (avatar) */}
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-700 overflow-hidden">
            <img
              className="h-10 w-10 object-cover rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
            />
          </span>
          <span className="ml-4 text-2xl font-bold text-white tracking-wide">John Doe</span>
        </div>
        {/* Navigation */}
        <nav className="flex-1 mt-4">
          <ul className="space-y-1 px-2">
            <li>
              <Link 
                href="/dashboard"
                className={`flex items-center px-4 py-3 rounded-lg font-medium text-base transition-colors duration-200 ${
                  isActive('/dashboard')
                    ? 'bg-[#23284A] text-white'
                    : 'text-gray-200 hover:bg-[#23284A] hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9.75 13.75C9.75 13.3358 10.0858 13 10.5 13H13.5C13.9142 13 14.25 13.3358 14.25 13.75V17M19.25 17V10.75C19.25 10.3358 18.9142 10 18.5 10H5.5C5.08579 10 4.75 10.3358 4.75 10.75V17M21 17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <button disabled className="flex items-center px-4 py-3 rounded-lg font-medium text-base text-gray-500 cursor-not-allowed w-full">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h.01M20 12h.01M12 4v.01M12 20v.01" />
                </svg>
                UI Elements
              </button>
            </li>
            <li>
              <button disabled className="flex items-center px-4 py-3 rounded-lg font-medium text-base text-gray-500 cursor-not-allowed w-full">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="4" y="8" width="16" height="8" rx="2" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16" />
                </svg>
                Tables
              </button>
            </li>
            <li>
              <button disabled className="flex items-center px-4 py-3 rounded-lg font-medium text-base text-gray-500 cursor-not-allowed w-full">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10h10M7 14h6" />
                </svg>
                Forms
              </button>
            </li>
            <li>
              <button disabled className="flex items-center px-4 py-3 rounded-lg font-medium text-base text-gray-500 cursor-not-allowed w-full">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="7" width="18" height="10" rx="2" strokeWidth="2" />
                  <rect x="7" y="11" width="10" height="2" rx="1" strokeWidth="2" />
                </svg>
                Cards
              </button>
            </li>
            <li>
              <button disabled className="flex items-center px-4 py-3 rounded-lg font-medium text-base text-gray-500 cursor-not-allowed w-full">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="12" rx="8" ry="4" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12v4c0 2.2091 3.582 4 8 4s8-1.7909 8-4v-4" />
                </svg>
                Modal
              </button>
            </li>
            <li>
              <button disabled className="flex items-center px-4 py-3 rounded-lg font-medium text-base text-gray-500 cursor-not-allowed w-full">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="4" y="8" width="16" height="8" rx="2" strokeWidth="2" />
                  <rect x="8" y="12" width="8" height="2" rx="1" strokeWidth="2" />
                </svg>
                Blank
              </button>
            </li>
            {/* Team Planning menu item */}
            <li>
              <Link 
                href="/teamplan"
                className={`flex items-center px-4 py-3 rounded-lg font-medium text-base transition-colors duration-200 ${
                  isActive('/teamplan')
                    ? 'bg-[#23284A] text-white'
                    : 'text-gray-200 hover:bg-[#23284A] hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Team Planning
              </Link>
            </li>
            {/* Settings menu item */}
            <li>
              <Link 
                href="/settings"
                className={`flex items-center px-4 py-3 rounded-lg font-medium text-base transition-colors duration-200 ${
                  isActive('/settings')
                    ? 'bg-[#23284A] text-white'
                    : 'text-gray-200 hover:bg-[#23284A] hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a1 1 0 01.832 0l1.518.606a1 1 0 00.948-.09l1.285-.964a1 1 0 011.414 0l1.285.964a1 1 0 00.948.09l1.518-.606a1 1 0 01.832 0l.606 1.518a1 1 0 00-.09.948l-.964 1.285a1 1 0 000 1.414l.964 1.285a1 1 0 00.09.948l-.606 1.518a1 1 0 010 .832l-1.518.606a1 1 0 00-.948.09l-1.285.964a1 1 0 01-1.414 0l-1.285-.964a1 1 0 00-.948-.09l-1.518.606a1 1 0 01-.832 0l-.606-1.518a1 1 0 00.09-.948l.964-1.285a1 1 0 000-1.414l-.964-1.285a1 1 0 00-.09-.948l.606-1.518z" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 dark:text-gray-400 focus:outline-none lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <button className="flex text-gray-600 dark:text-gray-400 focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              {/* Logout Icon */}
              <button className="flex text-gray-600 dark:text-gray-400 focus:outline-none cursor-pointer" onClick={() => router.push('/')}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
} 