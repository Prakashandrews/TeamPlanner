'use client';

import React, { useState, useRef, useEffect } from 'react'; // Import React, useState, etc.
import { FiSearch, FiArrowUp, FiArrowDown, FiCalendar, FiInfo, FiZoomIn, FiZoomOut, FiChevronLeft, FiChevronRight, FiList, FiBarChart2, FiFilter, FiPlus, FiX, FiEdit2, FiTrash2, FiUsers, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

// Add type definition for Release
interface Release {
  label: string;
  start: string;
  end: string;
  date: string;
}

// Move RELEASES to the very top
const getReleasesForQuarter = (quarter: string): Release[] => {
  const [q, year] = quarter.split(' ');
  const releases: Release[] = [];
  
  // Calculate start month based on quarter
  const startMonth = (parseInt(q.substring(1)) - 1) * 3;
  
  // Generate releases for the quarter (2 per month)
  for (let month = startMonth; month < startMonth + 3; month++) {
    const firstThursday = getFirstThursdayOfMonth(2025, month + 1);
    const thirdThursday = getThirdThursdayOfMonth(2025, month + 1);
    
    releases.push({
      label: `${q}-R${(month - startMonth) * 2 + 1}_${formatReleaseDate(firstThursday)}`,
      start: formatDate(addDays(firstThursday, -9)),
      end: formatDate(addDays(firstThursday, -1)),
      date: formatDate(firstThursday)
    });
    
    releases.push({
      label: `${q}-R${(month - startMonth) * 2 + 2}_${formatReleaseDate(thirdThursday)}`,
      start: formatDate(addDays(thirdThursday, -9)),
      end: formatDate(addDays(thirdThursday, -1)),
      date: formatDate(thirdThursday)
    });
  }
  
  return releases;
};

// Helper functions for date calculations
const getFirstThursdayOfMonth = (year: number, month: number) => {
  const date = new Date(year, month - 1, 1);
  while (date.getDay() !== 4) { // 4 is Thursday
    date.setDate(date.getDate() + 1);
  }
  return date;
};

const getThirdThursdayOfMonth = (year: number, month: number) => {
  const date = new Date(year, month - 1, 1);
  let thursdayCount = 0;
  while (thursdayCount < 3) {
    if (date.getDay() === 4) { // 4 is Thursday
      thursdayCount++;
    }
    if (thursdayCount < 3) {
      date.setDate(date.getDate() + 1);
    }
  }
  return date;
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatReleaseDate = (date: Date) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

const formatDate = (dateInput: Date | string | undefined): string => {
  if (!dateInput) return '-';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  // Check if date is valid
  if (isNaN(date.getTime())) return '-';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Generate sprints for the year, grouped by quarter
const SPRINTS_2025 = [
  // Q1
  { label: 'Q1-SPRINT-1', quarter: 'Q1', sprintNumber: 1, start: '2025-01-01', end: '2025-01-14' },
  { label: 'Q1-SPRINT-2', quarter: 'Q1', sprintNumber: 2, start: '2025-01-15', end: '2025-01-28' },
  { label: 'Q1-SPRINT-3', quarter: 'Q1', sprintNumber: 3, start: '2025-02-01', end: '2025-02-14' },
  { label: 'Q1-SPRINT-4', quarter: 'Q1', sprintNumber: 4, start: '2025-02-15', end: '2025-02-28' },
  { label: 'Q1-SPRINT-5', quarter: 'Q1', sprintNumber: 5, start: '2025-03-01', end: '2025-03-14' },
  { label: 'Q1-SPRINT-6', quarter: 'Q1', sprintNumber: 6, start: '2025-03-15', end: '2025-03-28' },
  // Q2
  { label: 'Q2-SPRINT-1', quarter: 'Q2', sprintNumber: 1, start: '2025-04-01', end: '2025-04-14' },
  { label: 'Q2-SPRINT-2', quarter: 'Q2', sprintNumber: 2, start: '2025-04-15', end: '2025-04-28' },
  { label: 'Q2-SPRINT-3', quarter: 'Q2', sprintNumber: 3, start: '2025-05-01', end: '2025-05-14' },
  { label: 'Q2-SPRINT-4', quarter: 'Q2', sprintNumber: 4, start: '2025-05-15', end: '2025-05-28' },
  { label: 'Q2-SPRINT-5', quarter: 'Q2', sprintNumber: 5, start: '2025-05-21', end: '2025-06-03' },
  { label: 'Q2-SPRINT-6', quarter: 'Q2', sprintNumber: 6, start: '2025-06-04', end: '2025-06-17' },
  { label: 'Q2-SPRINT-7', quarter: 'Q2', sprintNumber: 7, start: '2025-06-18', end: '2025-07-01' },
  // Q3
  { label: 'Q3-SPRINT-1', quarter: 'Q3', sprintNumber: 1, start: '2025-07-02', end: '2025-07-15' },
  { label: 'Q3-SPRINT-2', quarter: 'Q3', sprintNumber: 2, start: '2025-07-16', end: '2025-07-29' },
  { label: 'Q3-SPRINT-3', quarter: 'Q3', sprintNumber: 3, start: '2025-07-30', end: '2025-08-12' },
  { label: 'Q3-SPRINT-4', quarter: 'Q3', sprintNumber: 4, start: '2025-08-13', end: '2025-08-26' },
  { label: 'Q3-SPRINT-5', quarter: 'Q3', sprintNumber: 5, start: '2025-08-27', end: '2025-09-09' },
  { label: 'Q3-SPRINT-6', quarter: 'Q3', sprintNumber: 6, start: '2025-09-10', end: '2025-09-23' },
  // Q4
  { label: 'Q4-SPRINT-1', quarter: 'Q4', sprintNumber: 1, start: '2025-09-24', end: '2025-10-07' },
  { label: 'Q4-SPRINT-2', quarter: 'Q4', sprintNumber: 2, start: '2025-10-08', end: '2025-10-21' },
  { label: 'Q4-SPRINT-3', quarter: 'Q4', sprintNumber: 3, start: '2025-10-22', end: '2025-11-04' },
  { label: 'Q4-SPRINT-4', quarter: 'Q4', sprintNumber: 4, start: '2025-11-05', end: '2025-11-18' },
  { label: 'Q4-SPRINT-5', quarter: 'Q4', sprintNumber: 5, start: '2025-11-19', end: '2025-12-02' },
  { label: 'Q4-SPRINT-6', quarter: 'Q4', sprintNumber: 6, start: '2025-12-03', end: '2025-12-16' },
  { label: 'Q4-SPRINT-7', quarter: 'Q4', sprintNumber: 7, start: '2025-12-17', end: '2025-12-30' },
];

// Sample data type
interface TeamPlan {
  id: number;
  epic: string;
  team: 'YC' | 'FC';
  startDate?: string; // Make startDate optional
  sprint: string;
  sprintStart: string;
  sprintEnd: string;
  quarter: string;
  sprintNumber: number;
  priority: 'High' | 'Medium' | 'Low';
  devEffort: number;
  qaEffort: number;
  totalEffort: number;
  releaseDate: string;
  sprintAllocation: Record<string, { dev: number; qa: number }>;
  startSprint: string;
}

// Sample data for Team Plan
const sampleData: TeamPlan[] = [
  // Q1 2025 Features (January - March)
  {
    id: 1,
    epic: 'Core Platform Infrastructure',
    team: 'YC',
    startDate: '2025-01-01',
    sprint: 'Q1-SPRINT-1',
    sprintStart: '2025-01-01',
    sprintEnd: '2025-01-14',
    quarter: 'Q1',
    sprintNumber: 1,
    priority: 'High',
    devEffort: 8,
    qaEffort: 3,
    totalEffort: 11,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q1-SPRINT-1'
  },
  {
    id: 2,
    epic: 'Database Migration System',
    team: 'YC',
    startDate: '2025-01-15',
    sprint: 'Q1-SPRINT-2',
    sprintStart: '2025-01-15',
    sprintEnd: '2025-01-28',
    quarter: 'Q1',
    sprintNumber: 2,
    priority: 'High',
    devEffort: 7,
    qaEffort: 3,
    totalEffort: 10,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q1-SPRINT-2'
  },
  {
    id: 3,
    epic: 'API Gateway Implementation',
    team: 'YC',
    startDate: '2025-02-01',
    sprint: 'Q1-SPRINT-3',
    sprintStart: '2025-02-01',
    sprintEnd: '2025-02-14',
    quarter: 'Q1',
    sprintNumber: 3,
    priority: 'Medium',
    devEffort: 6,
    qaEffort: 2,
    totalEffort: 8,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q1-SPRINT-3'
  },
  {
    id: 4,
    epic: 'Security Framework',
    team: 'YC',
    startDate: '2025-02-15',
    sprint: 'Q1-SPRINT-4',
    sprintStart: '2025-02-15',
    sprintEnd: '2025-02-28',
    quarter: 'Q1',
    sprintNumber: 4,
    priority: 'High',
    devEffort: 9,
    qaEffort: 4,
    totalEffort: 13,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q1-SPRINT-4'
  },
  {
    id: 5,
    epic: 'Monitoring System',
    team: 'YC',
    startDate: '2025-03-01',
    sprint: 'Q1-SPRINT-5',
    sprintStart: '2025-03-01',
    sprintEnd: '2025-03-14',
    quarter: 'Q1',
    sprintNumber: 5,
    priority: 'Medium',
    devEffort: 5,
    qaEffort: 2,
    totalEffort: 7,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q1-SPRINT-5'
  },
  {
    id: 6,
    epic: 'Logging Infrastructure',
    team: 'YC',
    startDate: '2025-03-15',
    sprint: 'Q1-SPRINT-6',
    sprintStart: '2025-03-15',
    sprintEnd: '2025-03-28',
    quarter: 'Q1',
    sprintNumber: 6,
    priority: 'Low',
    devEffort: 4,
    qaEffort: 2,
    totalEffort: 6,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q1-SPRINT-6'
  },

  // Q2 2025 Features (April - June) - Existing data
  {
    id: 7,
    epic: 'User Authentication System',
    team: 'YC',
    startDate: '2025-04-01',
    sprint: 'Q2-SPRINT-1',
    sprintStart: '2025-04-01',
    sprintEnd: '2025-04-14',
    quarter: 'Q2',
    sprintNumber: 1,
    priority: 'High',
    devEffort: 50, // Increased for overflow testing
    qaEffort: 20, // Increased for overflow testing
    totalEffort: 70,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-1'
  },
  {
    id: 8,
    epic: 'Payment Gateway Integration',
    team: 'YC',
    startDate: '2025-04-01', // Changed to start in Q2-SPRINT-1
    sprint: 'Q2-SPRINT-1', // Changed to start in Q2-SPRINT-1
    sprintStart: '2025-04-01',
    sprintEnd: '2025-04-14',
    quarter: 'Q2',
    sprintNumber: 1,
    priority: 'Medium', // Changed priority for 60/40 split test
    devEffort: 50, // Increased for overflow testing
    qaEffort: 30, // Increased for overflow testing
    totalEffort: 110,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-1'
  },
  {
    id: 25,
    epic: 'Q2-R1 Feature A - New',
    team: 'YC',
    startDate: '2025-04-01',
    sprint: 'Q2-SPRINT-1',
    sprintStart: '2025-04-01',
    sprintEnd: '2025-04-14',
    quarter: 'Q2',
    sprintNumber: 1,
    priority: 'High',
    devEffort: 10,
    qaEffort: 5,
    totalEffort: 15,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-1'
  },
  {
    id: 26,
    epic: 'Q2-R1 Feature B - New',
    team: 'YC',
    startDate: '2025-04-01',
    sprint: 'Q2-SPRINT-1',
    sprintStart: '2025-04-01',
    sprintEnd: '2025-04-14',
    quarter: 'Q2',
    sprintNumber: 1,
    priority: 'High',
    devEffort: 10,
    qaEffort: 5,
    totalEffort: 15,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-1'
  },
  {
    id: 27,
    epic: 'Q2-R1 Feature C - New',
    team: 'YC',
    startDate: '2025-04-01',
    sprint: 'Q2-SPRINT-1',
    sprintStart: '2025-04-01',
    sprintEnd: '2025-04-14',
    quarter: 'Q2',
    sprintNumber: 1,
    priority: 'Medium',
    devEffort: 10,
    qaEffort: 5,
    totalEffort: 15,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-1'
  },
  {
    id: 28,
    epic: 'Q2-R1 Feature D - New',
    team: 'YC',
    startDate: '2025-04-01',
    sprint: 'Q2-SPRINT-1',
    sprintStart: '2025-04-01',
    sprintEnd: '2025-04-14',
    quarter: 'Q2',
    sprintNumber: 1,
    priority: 'Medium',
    devEffort: 10,
    qaEffort: 5,
    totalEffort: 15,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-1'
  },
  {
    id: 29,
    epic: 'Q2-R1 Feature E - New',
    team: 'YC',
    startDate: '2025-04-01',
    sprint: 'Q2-SPRINT-1',
    sprintStart: '2025-04-01',
    sprintEnd: '2025-04-14',
    quarter: 'Q2',
    sprintNumber: 1,
    priority: 'Low',
    devEffort: 10,
    qaEffort: 5,
    totalEffort: 15,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-1'
  },
  {
    id: 9,
    epic: 'Inventory Management System',
    team: 'YC',
    startDate: '2025-05-01',
    sprint: 'Q2-SPRINT-3',
    sprintStart: '2025-05-01',
    sprintEnd: '2025-05-14',
    quarter: 'Q2',
    sprintNumber: 3,
    priority: 'Medium',
    devEffort: 6,
    qaEffort: 2,
    totalEffort: 8,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-3'
  },
  {
    id: 10,
    epic: 'Order Processing System',
    team: 'YC',
    startDate: '2025-05-15',
    sprint: 'Q2-SPRINT-4',
    sprintStart: '2025-05-15',
    sprintEnd: '2025-05-28',
    quarter: 'Q2',
    sprintNumber: 4,
    priority: 'High',
    devEffort: 7,
    qaEffort: 3,
    totalEffort: 10,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-4'
  },
  {
    id: 11,
    epic: 'Customer Support Portal',
    team: 'YC',
    startDate: '2025-06-01',
    sprint: 'Q2-SPRINT-5',
    sprintStart: '2025-06-01',
    sprintEnd: '2025-06-14',
    quarter: 'Q2',
    sprintNumber: 5,
    priority: 'Medium',
    devEffort: 5,
    qaEffort: 2,
    totalEffort: 7,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-5'
  },
  {
    id: 12,
    epic: 'Analytics Dashboard',
    team: 'YC',
    startDate: '2025-06-15',
    sprint: 'Q2-SPRINT-6',
    sprintStart: '2025-06-15',
    sprintEnd: '2025-06-28',
    quarter: 'Q2',
    sprintNumber: 6,
    priority: 'Low',
    devEffort: 4,
    qaEffort: 2,
    totalEffort: 6,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q2-SPRINT-6'
  },

  // Q3 2025 Features (July - September)
  {
    id: 13,
    epic: 'Mobile App Development',
    team: 'YC',
    startDate: '2025-07-01',
    sprint: 'Q3-SPRINT-1',
    sprintStart: '2025-07-01',
    sprintEnd: '2025-07-14',
    quarter: 'Q3',
    sprintNumber: 1,
    priority: 'High',
    devEffort: 9,
    qaEffort: 4,
    totalEffort: 13,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q3-SPRINT-1'
  },
  {
    id: 14,
    epic: 'Push Notification System',
    team: 'YC',
    startDate: '2025-07-15',
    sprint: 'Q3-SPRINT-2',
    sprintStart: '2025-07-15',
    sprintEnd: '2025-07-28',
    quarter: 'Q3',
    sprintNumber: 2,
    priority: 'Medium',
    devEffort: 6,
    qaEffort: 2,
    totalEffort: 8,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q3-SPRINT-2'
  },
  {
    id: 15,
    epic: 'Offline Mode Support',
    team: 'YC',
    startDate: '2025-08-01',
    sprint: 'Q3-SPRINT-3',
    sprintStart: '2025-08-01',
    sprintEnd: '2025-08-14',
    quarter: 'Q3',
    sprintNumber: 3,
    priority: 'High',
    devEffort: 7,
    qaEffort: 3,
    totalEffort: 10,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q3-SPRINT-3'
  },
  {
    id: 16,
    epic: 'Social Media Integration',
    team: 'YC',
    startDate: '2025-08-15',
    sprint: 'Q3-SPRINT-4',
    sprintStart: '2025-08-15',
    sprintEnd: '2025-08-28',
    quarter: 'Q3',
    sprintNumber: 4,
    priority: 'Medium',
    devEffort: 5,
    qaEffort: 2,
    totalEffort: 7,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q3-SPRINT-4'
  },
  {
    id: 17,
    epic: 'Voice Search Feature',
    team: 'YC',
    startDate: '2025-09-01',
    sprint: 'Q3-SPRINT-5',
    sprintStart: '2025-09-01',
    sprintEnd: '2025-09-14',
    quarter: 'Q3',
    sprintNumber: 5,
    priority: 'Low',
    devEffort: 8,
    qaEffort: 3,
    totalEffort: 11,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q3-SPRINT-5'
  },
  {
    id: 18,
    epic: 'AR Product Visualization',
    team: 'YC',
    startDate: '2025-09-15',
    sprint: 'Q3-SPRINT-6',
    sprintStart: '2025-09-15',
    sprintEnd: '2025-09-28',
    quarter: 'Q3',
    sprintNumber: 6,
    priority: 'High',
    devEffort: 10,
    qaEffort: 4,
    totalEffort: 14,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q3-SPRINT-6'
  },

  // Q4 2025 Features (October - December)
  {
    id: 19,
    epic: 'AI Recommendation Engine',
    team: 'YC',
    startDate: '2025-10-01',
    sprint: 'Q4-SPRINT-1',
    sprintStart: '2025-10-01',
    sprintEnd: '2025-10-14',
    quarter: 'Q4',
    sprintNumber: 1,
    priority: 'High',
    devEffort: 12,
    qaEffort: 5,
    totalEffort: 17,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q4-SPRINT-1'
  },
  {
    id: 20,
    epic: 'Chatbot Integration',
    team: 'YC',
    startDate: '2025-10-15',
    sprint: 'Q4-SPRINT-2',
    sprintStart: '2025-10-15',
    sprintEnd: '2025-10-28',
    quarter: 'Q4',
    sprintNumber: 2,
    priority: 'Medium',
    devEffort: 7,
    qaEffort: 3,
    totalEffort: 10,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q4-SPRINT-2'
  },
  {
    id: 21,
    epic: 'Predictive Analytics',
    team: 'YC',
    startDate: '2025-11-01',
    sprint: 'Q4-SPRINT-3',
    sprintStart: '2025-11-01',
    sprintEnd: '2025-11-14',
    quarter: 'Q4',
    sprintNumber: 3,
    priority: 'High',
    devEffort: 9,
    qaEffort: 4,
    totalEffort: 13,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q4-SPRINT-3'
  },
  {
    id: 22,
    epic: 'Blockchain Integration',
    team: 'YC',
    startDate: '2025-11-15',
    sprint: 'Q4-SPRINT-4',
    sprintStart: '2025-11-15',
    sprintEnd: '2025-11-28',
    quarter: 'Q4',
    sprintNumber: 4,
    priority: 'Medium',
    devEffort: 8,
    qaEffort: 3,
    totalEffort: 11,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q4-SPRINT-4'
  },
  {
    id: 23,
    epic: 'IoT Device Support',
    team: 'YC',
    startDate: '2025-12-01',
    sprint: 'Q4-SPRINT-5',
    sprintStart: '2025-12-01',
    sprintEnd: '2025-12-14',
    quarter: 'Q4',
    sprintNumber: 5,
    priority: 'Low',
    devEffort: 6,
    qaEffort: 2,
    totalEffort: 8,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q4-SPRINT-5'
  },
  {
    id: 24,
    epic: 'Performance Optimization',
    team: 'YC',
    startDate: '2025-12-15',
    sprint: 'Q4-SPRINT-6',
    sprintStart: '2025-12-15',
    sprintEnd: '2025-12-28',
    quarter: 'Q4',
    sprintNumber: 6,
    priority: 'High',
    devEffort: 5,
    qaEffort: 2,
    totalEffort: 7,
    releaseDate: '',
    sprintAllocation: {},
    startSprint: 'Q4-SPRINT-6'
  }
];

// Add sprint boundary constants
const SPRINT_DURATION = 14; // 2 weeks
// Removed SPRINT_START_DATES as it's not used by the new scheduler
// const SPRINT_START_DATES: Record<number, string> = {
//   6: '2025-06-04',
//   7: '2025-06-18',
//   8: '2025-07-02',
//   9: '2025-07-16'
// };

// Define sprint capacities (adjust these based on your actual team capacity)
// Assuming 10 members per team * 10 working days per sprint = 100 total capacity days per team
const DEV_CAPACITY_PER_SPRINT_DEFAULT = 100; // Default Capacity per team
const QA_CAPACITY_PER_SPRINT_DEFAULT = 100; // Default Capacity per team

// Move calculateDuration function before scheduleFeature
// Calculate duration between dates (still useful for display and scheduler)
const calculateDuration = (startDate: string | undefined, releaseDate: string) => {
  if (!startDate) return 0;
  const start = new Date(startDate);
  const release = new Date(releaseDate);
  // Ensure valid dates before calculation
  if (isNaN(start.getTime()) || isNaN(release.getTime())) return 0;
  const diffTime = Math.abs(release.getTime() - start.getTime());
  // Calculate working days (excluding weekends) for a more accurate duration
  let totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let workingDays = 0;
  let currentDate = new Date(start);
   while (currentDate <= release) {
       const dayOfWeek = currentDate.getDay();
       if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Sunday, 6 = Saturday
           workingDays++;
       }
       currentDate.setDate(currentDate.getDate() + 1);
   }
  return workingDays;
};

// Helper function to find next Thursday release
const findNextThursdayRelease = (date: Date, releases: Release[]): string => {
  // Sort releases by date to ensure we find the next one
  const sortedReleases = [...releases].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Find the first release that is after or on the completion date
  const nextRelease = sortedReleases.find((r: Release) => {
    const releaseDate = new Date(r.date);
    return releaseDate >= date;
  });
  
  return nextRelease?.date || '';
};

// Function to schedule a feature based on effort and capacity
const scheduleFeature = (
  feature: TeamPlan,
  alreadyScheduledFeatures: TeamPlan[],
  fullSortedFeaturesList: TeamPlan[],
  sprints: typeof SPRINTS_2025,
  sprintCapacities: Record<string, { devMembers: number; qaMembers: number }>,
  releases: Release[]
): { releaseDate: string; sprintAllocation: Record<string, { dev: number; qa: number }> } => {
  const sprintAllocation: Record<string, { dev: number; qa: number }> = {};
  let remainingDevEffort = feature.devEffort;
  let remainingQaEffort = feature.qaEffort;
  let releaseDate = '';

  const startSprintIndex = sprints.findIndex(s => s.label === feature.startSprint);
  if (startSprintIndex === -1) {
    return { releaseDate: '', sprintAllocation: {} };
  }

  // Initialize cumulative capacity tracking
  const cumulativeSprintUsedCapacity: Record<string, { dev: number; qa: number }> = {};
  // Pre-populate all sprints with zero allocation
  sprints.forEach(sprint => {
    cumulativeSprintUsedCapacity[sprint.label] = { dev: 0, qa: 0 };
  });

  alreadyScheduledFeatures.forEach(schFeature => {
    Object.entries(schFeature.sprintAllocation || {}).forEach(([sprintLabel, allocation]) => {
      // cumulativeSprintUsedCapacity[sprintLabel] is guaranteed to exist now
      cumulativeSprintUsedCapacity[sprintLabel].dev += allocation.dev;
      cumulativeSprintUsedCapacity[sprintLabel].qa += allocation.qa;
    });
  });

  // Track completion date
  let currentSprintIndex = startSprintIndex;
  let devCompletionDate: Date | null = null; // Track when dev is completed

  // --- Allocate Dev Effort ---
  while (remainingDevEffort > 0) {
    if (currentSprintIndex >= sprints.length) break; // Ran out of sprints

    const currentSprint = sprints[currentSprintIndex];
    // Ensure sprintAllocation for the current sprint is initialized at the beginning of the loop
    sprintAllocation[currentSprint.label] = sprintAllocation[currentSprint.label] || { dev: 0, qa: 0 };
    
    const sprintCapacity = sprintCapacities[currentSprint.label] || { devMembers: 5, qaMembers: 5 };
    const usedCapacity = cumulativeSprintUsedCapacity[currentSprint.label];
    const availableDevCapacity = sprintCapacity.devMembers * 10 - usedCapacity.dev;

    const devAllocated = Math.min(remainingDevEffort, availableDevCapacity);

    if (devAllocated > 0) {
      sprintAllocation[currentSprint.label].dev += devAllocated; // Directly update dev
      
      remainingDevEffort -= devAllocated;
      cumulativeSprintUsedCapacity[currentSprint.label].dev += devAllocated;
    }

    if (remainingDevEffort === 0) {
      // Dev completed in this sprint
      devCompletionDate = new Date(currentSprint.end);
    }
    currentSprintIndex++; // Move to next sprint for dev if not done
  }

  // If devEffort was 0 from the start, QA can start at the feature's start sprint, or its actual start date
  if (devCompletionDate === null) {
      devCompletionDate = new Date(feature.startDate || feature.sprintStart);
  }

  // Find the sprint index where QA can start (either the dev completion sprint or the first one after it)
  let qaStartSprintIndex = sprints.findIndex(s => new Date(s.start) >= devCompletionDate!); // Find the first sprint that starts on or after devCompletionDate
  
  // If no sprint starts on or after the devCompletionDate, set it to the last sprint index + 1 to ensure loop breaks if needed
  if (qaStartSprintIndex === -1) {
    qaStartSprintIndex = sprints.length; 
  }

  // Re-initialize currentSprintIndex for QA allocation from the determined QA start sprint
  currentSprintIndex = qaStartSprintIndex;

  // --- Allocate QA Effort ---
  let qaAllocationCompletionDate: Date | null = null;
  while (remainingQaEffort > 0) {
    if (currentSprintIndex >= sprints.length) break; // Ran out of sprints

    const currentSprint = sprints[currentSprintIndex];
    // Ensure sprintAllocation for the current sprint is initialized at the beginning of the loop
    sprintAllocation[currentSprint.label] = sprintAllocation[currentSprint.label] || { dev: 0, qa: 0 };
    
    const sprintCapacity = sprintCapacities[currentSprint.label] || { devMembers: 5, qaMembers: 5 };
    const usedCapacity = cumulativeSprintUsedCapacity[currentSprint.label];
    const availableQaCapacity = sprintCapacity.qaMembers * 10 - usedCapacity.qa;

    const qaAllocated = Math.min(remainingQaEffort, availableQaCapacity);

    if (qaAllocated > 0) {
      // Explicitly ensure sprintAllocation[currentSprint.label] is initialized here
      if (!sprintAllocation[currentSprint.label]) {
        sprintAllocation[currentSprint.label] = { dev: 0, qa: 0 };
      }
      sprintAllocation[currentSprint.label].qa += qaAllocated; // This is line 783
      
      remainingQaEffort -= qaAllocated;
      cumulativeSprintUsedCapacity[currentSprint.label].qa += qaAllocated;
    }
    
    if (remainingQaEffort === 0) {
        qaAllocationCompletionDate = new Date(currentSprint.end);
    }
    currentSprintIndex++;
  }

  // The overall completion date for the feature is the later of dev completion or QA completion
  let finalCompletionDate = devCompletionDate;
  if (qaAllocationCompletionDate && finalCompletionDate && qaAllocationCompletionDate > finalCompletionDate) {
      finalCompletionDate = qaAllocationCompletionDate;
  } else if (!finalCompletionDate && qaAllocationCompletionDate) { // case where dev effort was 0 initially
      finalCompletionDate = qaAllocationCompletionDate;
  } else if (!finalCompletionDate && !qaAllocationCompletionDate) { // case where both are 0, use start sprint end date as completion
      finalCompletionDate = new Date(sprints[startSprintIndex]?.end || feature.sprintStart); 
  }

  releaseDate = findNextThursdayRelease(finalCompletionDate!, releases);
  return { releaseDate, sprintAllocation };
};

// initializeSampleData function - now just returns raw data
const initializeSampleData = (data: TeamPlan[]): TeamPlan[] => {
  return data.map(f => ({ ...f, sprintAllocation: {}, releaseDate: '' })); // Clear old allocations on load
};

// Recalculate schedule function (now the main scheduling orchestrator)
const recalculateSchedule = (
  currentFeatures: TeamPlan[],
  sprints: typeof SPRINTS_2025,
  sprintCapacities: Record<string, { devMembers: number; qaMembers: number }>,
  releases: Release[]
): TeamPlan[] => {
  // Sort features by start sprint and then by priority (High > Medium > Low)
  const sortedFeatures = [...currentFeatures].sort((a, b) => {
    const sprintOrderA = sprints.findIndex(s => s.label === a.startSprint);
    const sprintOrderB = sprints.findIndex(s => s.label === b.startSprint);
    if (sprintOrderA !== sprintOrderB) return sprintOrderA - sprintOrderB; // Sort by sprint first
    
    // If same sprint, sort by priority (High > Medium > Low)
    const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const reScheduledFeatures: TeamPlan[] = [];

  // Iterate through sorted features and schedule them one by one
  sortedFeatures.forEach(feature => {
    const { releaseDate, sprintAllocation } = scheduleFeature(
      feature,
      reScheduledFeatures, // Pass features already scheduled to account for their allocation
      sortedFeatures, // Pass the full sorted list to correctly apply 60/40 rule
      sprints,
      sprintCapacities,
      releases
    );

    reScheduledFeatures.push({
      ...feature,
      releaseDate,
      sprintAllocation
    });
  });

  return reScheduledFeatures;
};

type SortField = 'startDate' | 'releaseDate' | 'duration' | null;
type SortDirection = 'asc' | 'desc';

// Removed releaseDate from NewFeatureForm as it's now calculated
interface NewFeatureForm {
  epic: string;
  team: 'YC' | 'FC';
  priority: 'High' | 'Medium' | 'Low';
  devEffort: number;
  qaEffort: number;
  startSprint: string;
}

// Removed Gantt and Task imports
// import { Gantt, Task, ViewMode } from 'gantt-task-react';
// import "gantt-task-react/dist/index.css";

// Add localStorage key constant
const STORAGE_KEY = 'team_planning_data';

// Add function to load data from localStorage
const loadDataFromStorage = (): TeamPlan[] => {
  if (typeof window === 'undefined') return []; // Handle SSR
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error('Error parsing stored data:', e);
      return [];
    }
  }
  return [];
};

// Add function to save data to localStorage
const saveDataToStorage = (data: TeamPlan[]) => {
  if (typeof window === 'undefined') return; // Handle SSR
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving data to storage:', e);
  }
};

// Add localStorage keys
const SPRINT_CAPACITIES_KEY = 'team_planning_capacities';

// Add function to load sprint capacities from localStorage
const loadSprintCapacitiesFromStorage = (): Record<string, { devMembers: number; qaMembers: number }> => {
  if (typeof window === 'undefined') return {}; // Handle SSR
  const storedData = localStorage.getItem(SPRINT_CAPACITIES_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error('Error parsing stored sprint capacities:', e);
      return {};
    }
  }
  return {};
};

// Add function to save sprint capacities to localStorage
const saveSprintCapacitiesToStorage = (data: Record<string, { devMembers: number; qaMembers: number }>) => {
  if (typeof window === 'undefined') return; // Handle SSR
  try {
    localStorage.setItem(SPRINT_CAPACITIES_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving sprint capacities to storage:', e);
  }
};

// Add helper function to get sprint order
const getSprintOrder = (sprintLabel: string): number => {
  return SPRINTS_2025.findIndex(s => s.label === sprintLabel);
};

// Add type definition for Release
// interface Release {
//   label: string;
//   start: string;
//   end: string;
//   date: string;
// }

export default function TeamPlanningPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const itemsPerPage = 10;
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState(0);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'intakes' | 'table' | 'capacity' | 'timeline'>('table'); // Set default view to 'table' (Intakes)
  const [filterTeam, setFilterTeam] = useState<'all' | 'YC' | 'FC'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'High' | 'Medium' | 'Low'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editFeatureId, setEditFeatureId] = useState<number | null>(null);
  const [newFeature, setNewFeature] = useState<NewFeatureForm>(
    {
      epic: '',
      team: 'YC',
      priority: 'Medium',
      devEffort: 0,
      qaEffort: 0,
      startSprint: SPRINTS_2025[0].label,
    }
  );
  const [selectedEpic, setSelectedEpic] = useState<TeamPlan | null>(null);
  const [tooltipEpic, setTooltipEpic] = useState<number | null>(null);
  const [timelineType, setTimelineType] = useState<'roadmap' | 'kanban'>('roadmap'); // Set default to roadmap and remove gantt option

  // New state for quarter selection
  const QUARTERS = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']; // Define available quarters
  const [selectedQuarter, setSelectedQuarter] = useState<string>(QUARTERS[1]); // Default to Q2 2025

  // Filtered sprints based on selected quarter
  const filteredSprints = SPRINTS_2025.filter(sprint => sprint.quarter === selectedQuarter.split(' ')[0]);

  // New state for raw features (before scheduling)
  const [rawFeatures, setRawFeatures] = useState<TeamPlan[]>(() => {
    const storedData = loadDataFromStorage();
    if (storedData.length > 0) {
      return storedData.map(f => ({ ...f, sprintAllocation: {}, releaseDate: '' })); // Ensure raw data is clean
    }
    return initializeSampleData(sampleData); // Get raw sample data
  });

  // Update sprintCapacities state initialization to use localStorage
  const [sprintCapacities, setSprintCapacities] = useState<Record<string, { devMembers: number; qaMembers: number }>>(() => {
    const storedCapacities = loadSprintCapacitiesFromStorage();
    if (Object.keys(storedCapacities).length > 0) {
      return storedCapacities;
    }
    // If no stored capacities, initialize with default values
    const initialCapacities: Record<string, { devMembers: number; qaMembers: number }> = {};
    SPRINTS_2025.forEach(sprint => {
      initialCapacities[sprint.label] = { devMembers: 5, qaMembers: 5 };
    });
    return initialCapacities;
  });

  // This state will hold the *calculated* features with sprint allocations
  const [features, setFeatures] = useState<TeamPlan[]>([]);

  // Recalculate features whenever rawFeatures or sprintCapacities change
  useEffect(() => {
      console.log("Recalculating schedule due to rawFeatures or capacity change...");
      const reScheduledFeatures = recalculateSchedule(rawFeatures, SPRINTS_2025, sprintCapacities, getReleasesForQuarter(selectedQuarter)); // Pass rawFeatures

      // Removed the areFeaturesEqual comparison for aggressive re-rendering debugging
      // if (!areFeaturesEqual(features, reScheduledFeatures)) {
          console.log("Schedule changed, updating state. Setting features to:", reScheduledFeatures.map(f => ({id: f.id, epic: f.epic, sprintAllocation: f.sprintAllocation})));
          setFeatures(reScheduledFeatures);
          console.log("Saving rawFeatures to localStorage:", rawFeatures.map(f => ({id: f.id, epic: f.epic, sprintAllocation: f.sprintAllocation})));
          saveDataToStorage(rawFeatures); // Save raw data to localStorage
      // } else {
      //     console.log("Schedule did not change, skipping state update.");
      // }

  }, [rawFeatures, sprintCapacities, selectedQuarter]); // Dependencies are raw data and capacities

  // calculateDuration is now defined above

  // Filter data based on search term and selected quarter
  const filteredData = features.filter(item => {
    const teamMatch = filterTeam === 'all' || item.team === filterTeam;
    const priorityMatch = filterPriority === 'all' || item.priority === filterPriority;
    const quarterMatch = item.quarter === selectedQuarter.split(' ')[0]; // Filter by selected quarter
    // Include search term filtering if needed, currently commented out
    // const searchTermMatch = searchTerm === '' ||
    //   item.epic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.sprint.toLowerCase().includes(searchTerm.toLowerCase());
    return teamMatch && priorityMatch && quarterMatch; // && searchTermMatch;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    if (sortField === 'duration') {
      const durationA = calculateDuration(a.startDate, a.releaseDate);
      const durationB = calculateDuration(b.startDate, b.releaseDate);
      return sortDirection === 'asc' ? durationA - durationB : durationB - durationA;
    }

    const valueA = a[sortField];
    const valueB = b[sortField];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
       // Handle date sorting
      if (sortField === 'startDate' || sortField === 'releaseDate') {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }
      // Handle string sorting
      return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    // Handle number sorting (for devEffort, qaEffort, totalEffort, sprintNumber if added to SortField)
    if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return 0; // Fallback
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get date color
  const getDateColor = (dateString: string | undefined) => {
    if (!dateString) return ''; // No color if no date
    const date = new Date(dateString);
    const today = new Date();
    // Set today's time to 00:00 for correct comparison
    today.setHours(0, 0, 0, 0);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'text-red-600'; // Past date
    if (diffDays <= 7) return 'text-yellow-600'; // Within a week
    return 'text-green-600'; // Future date
  };

  // Status badge component (kept for now, might remove later if status is purely date-based)
  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Done':
          return 'bg-green-100 text-green-800';
        case 'In Progress':
          return 'bg-yellow-100 text-yellow-800';
        case 'Not Started':
          return 'bg-gray-100 text-gray-800';
        default: 
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  };

  // Priority badge component
  const PriorityBadge = ({ priority }: { priority: string }) => {
    const getPriorityColor = (priority: string) => {
      switch (priority.toLowerCase()) {
        case 'high':
          return 'bg-red-100 text-red-800';
        case 'medium':
          return 'bg-yellow-100 text-yellow-800';
        case 'low':
          return 'bg-green-100 text-green-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
        {priority}
      </span>
    );
  };

  // Format date
  const formatDate = (dateInput: Date | string | undefined): string => {
    if (!dateInput) return '-';
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    // Check if date is valid
    if (isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format date with release number
  const formatDateWithRelease = (dateString: string | Date | undefined): string => {
    if (!dateString) return 'N/A';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
    // Find the release number
    const release = currentReleases.find((r: Release) => {
      const releaseDate = new Date(r.date);
      return releaseDate.toDateString() === date.toDateString();
    });
    
    const releaseNumber = release ? release.label.split('_')[0] : '';

    // Modify formatDate to exclude the year
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    return `${formattedDate}${releaseNumber ? ` (${releaseNumber})` : ''}`;
  };

  // Sort indicator component
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />;
  };

  // Calendar View (functional, shows epics on their release dates)
  const CalendarTimeline = () => {
    // Find the earliest and latest dates to determine the calendar range
    const relevantDates = filteredData.flatMap(item => [
      new Date(item.sprintStart).getTime(),
      new Date(item.releaseDate).getTime()
    ]).filter(d => !isNaN(d));

    const minDate = relevantDates.length > 0 ? new Date(Math.min(...relevantDates)) : new Date();
    const maxDate = relevantDates.length > 0 ? new Date(Math.max(...relevantDates)) : new Date();

     // Adjust range to include full months and add some buffer
    minDate.setDate(1); // Start at the beginning of the earliest month
    minDate.setMonth(minDate.getMonth() - 1); // Go back one month
    maxDate.setDate(1);
    maxDate.setMonth(maxDate.getMonth() + 2); // Go forward two months

    const years: number[] = [];
    for (let y = minDate.getFullYear(); y <= maxDate.getFullYear(); y++) {
        years.push(y);
    }

    // Map release dates to epics
    // Group epics by their *calculated* release date
    const epicsByReleaseDate: Record<string, TeamPlan[]> = {};
    filteredData.forEach((item: TeamPlan) => {
      if (item.releaseDate && !isNaN(new Date(item.releaseDate).getTime())) { // Only add if releaseDate is present and valid
         const releaseDateKey = item.releaseDate.split('T')[0]; // Use YYYY-MM-DD format as key
        if (!epicsByReleaseDate[releaseDateKey]) epicsByReleaseDate[releaseDateKey] = [];
        epicsByReleaseDate[releaseDateKey].push(item);
      }
    });

    // Helper to get all days in a month
    const getDaysInMonth = (year: number, month: number) => {
      const date = new Date(year, month, 1);
      const days = [];
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days;
    };

     // Build calendar grid for the relevant period
    const calendarMonths = years.flatMap(year => {
        const startMonth = (year === minDate.getFullYear()) ? minDate.getMonth() : 0;
        const endMonth = (year === maxDate.getFullYear()) ? maxDate.getMonth() : 11;

        const months = [];
        for (let month = startMonth; month <= endMonth; month++) {
            const daysInMonth = getDaysInMonth(year, month);
            const firstDayOfMonth = daysInMonth[0];
             const monthGrid: (Date | null)[] = [];
            // Fill initial empty days
            for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
                monthGrid.push(null);
            }
            daysInMonth.forEach(day => monthGrid.push(day));
             // Fill trailing empty days
             while (monthGrid.length % 7 !== 0) {
                 monthGrid.push(null);
             }
            months.push({ month: month, year: year, days: monthGrid });
        }
        return months;
    });


    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


    return (
      <div className="bg-white rounded-lg shadow p-6 min-h-[400px]">
        <div className="mb-4 text-lg font-semibold text-gray-700">Calendar View</div>
         <div className="overflow-x-auto">
            {calendarMonths.map(({ month, year, days }) => (
                <div key={`${year}-${month}`} className="mb-8" style={{ minWidth: 700 }}> {/* Ensure min width for calendar */}
                    <div className="text-center text-md font-bold text-gray-700 mb-4">
                         {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {weekdays.map(day => (
                        <div key={day} className="text-xs font-bold text-gray-500 text-center">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {days.map((date, idx) => {
                          const dateKey = date ? date.toISOString().split('T')[0] : null;
                          const epicsOnDate = dateKey ? epicsByReleaseDate[dateKey] || [] : [];
                           const isToday = date ? date.toDateString() === new Date().toDateString() : false;

                          return (
                            <div
                                key={idx}
                                className={`min-h-[80px] bg-gray-50 rounded-lg p-1 border ${isToday ? 'border-blue-500 bg-blue-100' : 'border-gray-100'} flex flex-col`}
                            >
                              {date && (
                                <div className={`text-xs font-semibold mb-1 text-right ${isToday ? 'text-blue-800' : 'text-gray-700'}`}>{date.getDate()}</div>
                              )}
                              <div className="flex flex-col space-y-1 overflow-hidden">
                                {epicsOnDate.map((item: TeamPlan) => (
                                  <span
                                     key={item.id}
                                     className={`px-2 py-1 rounded text-xs font-medium text-white truncate ${
                                      item.priority === 'High' ? 'bg-red-500' :
                                      item.priority === 'Medium' ? 'bg-yellow-500' :
                                      'bg-green-500'
                                    }`}
                                     title={`${item.epic} (${item.team})`}
                                     onClick={() => setSelectedEpic(item)} // Make calendar items clickable
                                     style={{ cursor: 'pointer' }}
                                  >
                                    {item.epic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                      })}
                    </div>
                </div>
            ))}
         </div>
      </div>
    );
  };


  // Edit handler
  const handleEdit = (feature: TeamPlan) => {
    setNewFeature({
      epic: feature.epic,
      team: feature.team,
      priority: feature.priority,
      devEffort: feature.devEffort,
      qaEffort: feature.qaEffort,
      startSprint: feature.startSprint,
    });
    setIsFormOpen(true);
    setEditFeatureId(feature.id);
  };

  // Delete handler
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      const updatedRawFeatures = rawFeatures.filter(f => f.id !== id);
      setRawFeatures(updatedRawFeatures); // Update raw features, useEffect will re-schedule
    }
  };

  // In handleFormSubmit, update or add feature
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a unique ID for new features
    const generateUniqueId = () => {
      const existingIds = rawFeatures.map(f => f.id);
      let newId = 1;
      while (existingIds.includes(newId)) {
        newId++;
      }
      return newId;
    };

    // Get the selected sprint's quarter
    const selectedSprint = SPRINTS_2025.find(s => s.label === newFeature.startSprint);
    const quarter = selectedQuarter.split(' ')[0]; // Use the currently selected quarter

    // Create a temporary feature object for scheduling
    const newFeatureFull: TeamPlan = {
      id: editFeatureId || generateUniqueId(),
      epic: newFeature.epic,
      team: newFeature.team,
      sprint: newFeature.startSprint,
      sprintStart: selectedSprint?.start || '',
      sprintEnd: selectedSprint?.end || '',
      quarter: quarter, // Use the selected quarter
      sprintNumber: selectedSprint?.sprintNumber || 0,
      priority: newFeature.priority,
      devEffort: newFeature.devEffort,
      qaEffort: newFeature.qaEffort,
      totalEffort: newFeature.devEffort + newFeature.qaEffort,
      releaseDate: '', // Initial empty releaseDate
      startSprint: newFeature.startSprint,
      sprintAllocation: {},
    };

    let updatedFeatures;
    if (editFeatureId) {
      updatedFeatures = rawFeatures.map(f => (f.id === editFeatureId ? newFeatureFull : f));
    } else {
      updatedFeatures = [...rawFeatures, newFeatureFull];
    }

    setRawFeatures(updatedFeatures); // Update rawFeatures instead of features

    setIsFormOpen(false);
    setEditFeatureId(null);
    // Reset form state
    setNewFeature({
      epic: '',
      team: 'YC',
      priority: 'Medium',
      devEffort: 0,
      qaEffort: 0,
      startSprint: SPRINTS_2025[0].label,
    });
  };

  // Calculate total sprint allocation across ALL features for the overview
  const calculateTotalSprintAllocation = (features: TeamPlan[]) => {
    const totalAllocation: Record<string, { dev: number; qa: number }> = {};

    // Initialize all sprints with zero allocation
    SPRINTS_2025.forEach(sprint => {
      totalAllocation[sprint.label] = { dev: 0, qa: 0 };
    });

    // Calculate total allocation for each sprint
    features.forEach(feature => {
      Object.entries(feature.sprintAllocation || {}).forEach(([sprintLabel, allocation]) => {
        if (totalAllocation[sprintLabel]) {
          totalAllocation[sprintLabel].dev += allocation.dev || 0;
          totalAllocation[sprintLabel].qa += allocation.qa || 0;
        }
      });
    });

    return totalAllocation;
  };

  interface TeamCapacityOverviewProps {
    sprintCapacities: Record<string, { devMembers: number; qaMembers: number }>; // Updated type
    setSprintCapacities: React.Dispatch<React.SetStateAction<Record<string, { devMembers: number; qaMembers: number }>>>; // Updated type
    features: TeamPlan[]; // Add features prop
    setRawFeatures: React.Dispatch<React.SetStateAction<TeamPlan[]>>; // Add setRawFeatures prop
  }

  // Team Capacity Overview Component (updated to match Excel structure and fix errors)
  const TeamCapacityOverview = ({ sprintCapacities, setSprintCapacities, features, sprints }: TeamCapacityOverviewProps & { sprints: typeof SPRINTS_2025 }) => { // Pass sprints prop explicitly

    // Function to find the first allocated sprint for a feature
    const findFirstAllocatedSprint = (feature: TeamPlan): string => {
      for (const sprint of sprints) {
        const allocation = feature.sprintAllocation?.[sprint.label];
        if (allocation && (allocation.dev > 0 || allocation.qa > 0)) {
          return sprint.label;
        }
      }
      return feature.startSprint; // Fallback to startSprint if no allocation found (e.g., zero effort epic)
    };

    // Filter features by selected quarter
    const filteredFeatures = features.filter(feature => feature.quarter === selectedQuarter.split(' ')[0]);

    // Calculate total allocation per sprint across ALL features for the summary rows
    const totalSprintAllocation = calculateTotalSprintAllocation(filteredFeatures);

    // Group features by team for easier rendering
    const featuresByTeam: Record<string, TeamPlan[]> = {
        'YC': filteredFeatures.filter(f => f.team === 'YC').sort((a, b) => a.epic.localeCompare(b.epic)), // Sort features alphabetically by epic
    };

    const handleDevMembersChange = (sprintLabel: string, value: number) => {
        setSprintCapacities(prev => {
            const newCapacities = {
                ...prev,
                [sprintLabel]: { ...prev[sprintLabel] || { devMembers: 0, qaMembers: 0 }, devMembers: value }
            };
            // The useEffect will trigger recalculateSchedule based on sprintCapacities change
            return newCapacities;
        });
    };

    const handleQaMembersChange = (sprintLabel: string, value: number) => {
        setSprintCapacities(prev => {
            const newCapacities = {
                ...prev,
                [sprintLabel]: { ...prev[sprintLabel] || { devMembers: 0, qaMembers: 0 }, qaMembers: value }
            };
            // The useEffect will trigger recalculateSchedule based on sprintCapacities change
            return newCapacities;
        });
    };

    // Handler for manual Dev effort allocation change
    const handleManualDevAllocationChange = (featureId: number, sprintLabel: string, value: number) => {
        setRawFeatures(prevFeatures => {
            const updatedFeatures = prevFeatures.map(feature => {
                if (feature.id === featureId) {
                    // For manual allocation, we just update the allocation directly
                    // and then re-trigger a full re-schedule to ensure consistency.
                    const updatedAllocation = { 
                      ...feature.sprintAllocation, 
                      [sprintLabel]: { 
                        ...(feature.sprintAllocation?.[sprintLabel] || { dev: 0, qa: 0 }), 
                        dev: value 
                      } 
                    };
                    return { ...feature, sprintAllocation: updatedAllocation };
                }
                return feature;
            });
            // The useEffect will trigger recalculateSchedule based on features change
            return updatedFeatures;
        });
    };

    // Handler for manual QA effort allocation change
    const handleManualQaAllocationChange = (featureId: number, sprintLabel: string, value: number) => {
        setRawFeatures(prevFeatures => {
            const updatedFeatures = prevFeatures.map(feature => {
                if (feature.id === featureId) {
                    // For manual allocation, we just update the allocation directly
                    // and then re-trigger a full re-schedule to ensure consistency.
                    const updatedAllocation = { 
                      ...feature.sprintAllocation, 
                      [sprintLabel]: { 
                        ...(feature.sprintAllocation?.[sprintLabel] || { dev: 0, qa: 0 }), 
                        qa: value 
                      } 
                    };
                    return { ...feature, sprintAllocation: updatedAllocation };
                }
                return feature;
            });
            // The useEffect will trigger recalculateSchedule based on features change
            return updatedFeatures;
        });
    };

    const getPercentageColor = (percentage: number) => {
        if (percentage < 0) return 'text-red-600';
        if (percentage <= 20) return 'text-yellow-700';
        return 'text-green-600';
    };

    const today = new Date(); // Get current date
    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

    // Sort features by start sprint
    const sortedFeatures = [...featuresByTeam['YC']].sort((a, b) => {
      const firstAllocatedSprintA = findFirstAllocatedSprint(a);
      const firstAllocatedSprintB = findFirstAllocatedSprint(b);

      const sprintOrderA = getSprintOrder(firstAllocatedSprintA);
      const sprintOrderB = getSprintOrder(firstAllocatedSprintB);

      if (sprintOrderA !== sprintOrderB) return sprintOrderA - sprintOrderB;

      // Secondary sort by priority if in the same first allocated sprint
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      // Tertiary sort by epic name for consistency
      return a.epic.localeCompare(b.epic);
    });

    // Filter sprints to only show those in the selected quarter
    const filteredSprints = sprints.filter(sprint => sprint.quarter === selectedQuarter.split(' ')[0]);

    return (
      <div className="space-y-8">
        {/* Render capacity table for YC team */}
        {featuresByTeam['YC'].length > 0 && (
          <div key="YC" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">YC Team Capacity Allocation</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr><th className="sticky left-0 bg-gray-50 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider z-10">S.No</th><th className="sticky left-[calc(theme(spacing.16))] bg-gray-50 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider z-10">Epic</th><th className="sticky left-[calc(theme(spacing.64))] bg-gray-50 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider z-10 border-l border-gray-200">Expected Release Date</th>
                  {filteredSprints.map(sprint => {
                    const sprintEndDate = new Date(sprint.end);
                    const isPastSprint = sprintEndDate < today;

                    return (
                      <th key={sprint.label} colSpan={2} className={`px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-l border-gray-200 ${isPastSprint ? 'bg-gray-200' : ''}`}>
                        {sprint.label}
                        <div className="text-gray-500 font-normal">{formatDateWithRelease(sprint.start)} - {formatDateWithRelease(sprint.end)}</div>
                        <div className="flex justify-center items-center space-x-2 mt-1">
                          <div className="flex flex-col items-center">
                            <label className="text-xxs font-medium text-gray-600 mb-1">Devs ({((sprintCapacities[sprint.label]?.devMembers || 0) * 10).toFixed(0)}d)</label>
                            <input
                              type="number"
                              value={sprintCapacities[sprint.label]?.devMembers ?? ''}
                              onChange={(e) => handleDevMembersChange(sprint.label, parseInt(e.target.value, 10) || 0)}
                              className={`w-12 px-1 py-0.5 border rounded-md text-xs text-center ${isPastSprint ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                              min="0"
                              readOnly={isPastSprint}
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <label className="text-xxs font-medium text-gray-600 mb-1">QAs ({((sprintCapacities[sprint.label]?.qaMembers || 0) * 10).toFixed(0)}d)</label>
                            <input
                              type="number"
                              value={sprintCapacities[sprint.label]?.qaMembers ?? ''}
                              onChange={(e) => handleQaMembersChange(sprint.label, parseInt(e.target.value, 10) || 0)}
                              className={`w-12 px-1 py-0.5 border rounded-md text-xs text-center ${isPastSprint ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                              min="0"
                              readOnly={isPastSprint}
                            />
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
                {/* Nested headers for Dev and QA Effort */}
                <tr><th className="sticky left-0 bg-gray-50 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider z-10"></th><th className="sticky left-[calc(theme(spacing.16))] bg-gray-50 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider z-10 border-l border-gray-200"></th><th className="sticky left-[calc(theme(spacing.64))] bg-gray-50 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider z-10 border-l border-gray-200"></th>{/* Placeholder for Expected Release Date */}
                  {filteredSprints.map(sprint => {
                    const sprintEndDate = new Date(sprint.end);
                    const isPastSprint = sprintEndDate < today;
                    return (
                      <React.Fragment key={`${sprint.label}-effort-headers`}><th className={`px- py-1 text-center text-xxs font-medium text-gray-600 uppercase tracking-wider border-l border-gray-200 ${isPastSprint ? 'bg-gray-200' : ''}`}>Dev Effort</th><th className={`px-2 py-1 text-center text-xxs font-medium text-gray-600 uppercase tracking-wider ${isPastSprint ? 'bg-gray-200' : ''}`}>QA Effort</th></React.Fragment>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedFeatures.map((feature, index) => (
                  <tr key={feature.id}><td className="sticky left-0 bg-white px-4 py-2 whitespace-nowrap text-sm text-gray-500 z-10">{index + 1}</td><td className="sticky left-[calc(theme(spacing.16))] bg-white px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 z-10">{feature.epic}</td><td className={`sticky left-[calc(theme(spacing.64))] bg-white px-4 py-2 whitespace-nowrap text-sm text-gray-700 z-10 border-l border-gray-200 ${getDateColor(feature.releaseDate)}`}>
                      {formatDateWithRelease(feature.releaseDate)}
                    </td>
                    {filteredSprints.map(sprint => {
                      const allocation = feature.sprintAllocation?.[sprint.label];
                      const sprintEndDate = new Date(sprint.end);
                      const isPastSprint = sprintEndDate < today;

                      return (
                        <React.Fragment key={`${feature.id}-${sprint.label}`}><td className={`px-2 py-1 whitespace-nowrap text-sm text-gray-700 text-center border-l border-gray-200 ${isPastSprint ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
                            <input
                              type="number"
                              min="0"
                              value={allocation?.dev || ''} // Use allocation for dev
                              onChange={(e) => handleManualDevAllocationChange(feature.id, sprint.label, parseInt(e.target.value) || 0)}
                              className={`w-16 px-2 py-1 text-sm border border-gray-300 rounded ${isPastSprint ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                              readOnly={isPastSprint}
                            />
                          </td><td className={`px-2 py-1 whitespace-nowrap text-sm text-gray-700 text-center ${isPastSprint ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
                            <input
                              type="number"
                              min="0"
                              value={allocation?.qa || ''} // Use allocation for qa
                              onChange={(e) => handleManualQaAllocationChange(feature.id, sprint.label, parseInt(e.target.value) || 0)}
                              className={`w-16 px-2 py-1 text-sm border border-gray-300 rounded ${isPastSprint ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                              readOnly={isPastSprint}
                            />
                          </td></React.Fragment>
                      );
                    })}
                  </tr>
                ))}
                {/* Summary Rows */}
                <tr className="bg-gray-100 font-semibold"><td className="sticky left-0 bg-gray-100 px-4 py-2 text-sm text-gray-800 z-10" colSpan={3}>Capacity Remaining (Days)</td>
                  {filteredSprints.map(sprint => {
                    const allocated = totalSprintAllocation[sprint.label] || { dev: 0, qa: 0 };
                    const sprintEndDate = new Date(sprint.end);
                    const isPastSprint = sprintEndDate < today;
                    const devCapacity = (sprintCapacities[sprint.label]?.devMembers || 0) * 10;
                    const qaCapacity = (sprintCapacities[sprint.label]?.qaMembers || 0) * 10;
                    return (
                      <React.Fragment key={`remaining-${sprint.label}`}><td className={`px-2 py-1 text-center text-sm ${isPastSprint ? 'bg-gray-200' : ''}`}>{devCapacity - allocated.dev}</td><td className={`px-2 py-1 text-center text-sm ${isPastSprint ? 'bg-gray-200' : ''}`}>{qaCapacity - allocated.qa}</td></React.Fragment>
                    );
                  })}
                </tr>
                <tr className="bg-gray-100 font-semibold"><td className="sticky left-0 bg-gray-100 px-4 py-2 text-sm text-gray-800 z-10" colSpan={3}>Total Allocated (Days)</td>
                  {filteredSprints.map(sprint => {
                    const allocated = totalSprintAllocation[sprint.label] || { dev: 0, qa: 0 };
                    const sprintEndDate = new Date(sprint.end);
                    const isPastSprint = sprintEndDate < today;
                    return (
                      <React.Fragment key={`total-${sprint.label}`}><td className={`px-2 py-1 text-center text-sm ${isPastSprint ? 'bg-gray-200' : ''}`}>{allocated.dev}</td><td className={`px-2 py-1 text-center text-sm ${isPastSprint ? 'bg-gray-200' : ''}`}>{allocated.qa}</td></React.Fragment>
                    );
                  })}
                </tr>
                <tr className="bg-gray-100 font-semibold"><td className="sticky left-0 bg-gray-100 px-4 py-2 text-sm text-gray-800 z-10" colSpan={3}>% Capacity Available</td>
                  {filteredSprints.map(sprint => {
                    const allocated = totalSprintAllocation[sprint.label] || { dev: 0, qa: 0 };
                    const sprintEndDate = new Date(sprint.end);
                    const isPastSprint = sprintEndDate < today;
                    const devCapacity = (sprintCapacities[sprint.label]?.devMembers || 0) * 10;
                    const qaCapacity = (sprintCapacities[sprint.label]?.qaMembers || 0) * 10;
                    const devPercentage = devCapacity ? ((devCapacity - allocated.dev) / devCapacity) * 100 : 0;
                    const qaPercentage = qaCapacity ? ((qaCapacity - allocated.qa) / qaCapacity) * 100 : 0;
                    return (
                      <React.Fragment key={`percentage-${sprint.label}`}><td className={`px-2 py-1 text-center text-sm ${isPastSprint ? 'bg-gray-200' : ''}`}>
                          <span className={getPercentageColor(devPercentage)}>{devPercentage.toFixed(0)}%</span>
                        </td><td className={`px-2 py-1 text-center text-sm ${isPastSprint ? 'bg-gray-200' : ''}`}>
                          <span className={getPercentageColor(qaPercentage)}>{qaPercentage.toFixed(0)}%</span>
                        </td></React.Fragment>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // Form Modal Component
  const FormModal = () => {
    const handleModalClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleCancel();
      }
    };

    const handleCancel = () => {
      setNewFeature({
        epic: '',
        team: 'YC',
        priority: 'Medium',
        devEffort: 0,
        qaEffort: 0,
        startSprint: SPRINTS_2025[0].label,
      });
      setIsFormOpen(false);
      setEditFeatureId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleFormSubmit(e);
    };

    return (
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center" 
        onClick={handleModalClick}
      >
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">{editFeatureId ? 'Edit Feature' : 'Add New Feature'}</h3>
            <button 
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
              type="button"
            >
              <FiX className="text-xl" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="epic" className="block text-sm font-medium text-gray-700 mb-1">Epic</label>
              <input
                type="text"
                id="epic"
                value={newFeature.epic}
                onChange={(e) => setNewFeature({ ...newFeature, epic: e.target.value })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">Team</label>
              <select
                id="team"
                value={newFeature.team}
                onChange={(e) => setNewFeature({ ...newFeature, team: e.target.value as 'YC' | 'FC' })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="YC">YC</option>
                <option value="FC">FC</option>
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                id="priority"
                value={newFeature.priority}
                onChange={(e) => setNewFeature({ ...newFeature, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label htmlFor="devEffort" className="block text-sm font-medium text-gray-700 mb-1">Dev Effort (days)</label>
              <input
                type="number"
                id="devEffort"
                value={newFeature.devEffort}
                onChange={(e) => setNewFeature({ ...newFeature, devEffort: parseFloat(e.target.value) || 0 })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
              />
            </div>
            <div>
              <label htmlFor="qaEffort" className="block text-sm font-medium text-gray-700 mb-1">QA Effort (days)</label>
              <input
                type="number"
                id="qaEffort"
                value={newFeature.qaEffort}
                onChange={(e) => setNewFeature({ ...newFeature, qaEffort: parseFloat(e.target.value) || 0 })}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
              />
            </div>
            <div>
              <label htmlFor="totalEffort" className="block text-sm font-medium text-gray-700 mb-1">Total Effort (days)</label>
              <input
                type="number"
                id="totalEffort"
                value={newFeature.devEffort + newFeature.qaEffort}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                readOnly
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="startSprint" className="block text-sm font-medium text-gray-700 mb-1">Start Sprint</label>
              <select
                id="startSprint"
                value={newFeature.startSprint}
                onChange={(e) => {
                  const selectedSprint = SPRINTS_2025.find(s => s.label === e.target.value);
                  if (selectedSprint) {
                    setNewFeature({
                      ...newFeature,
                      startSprint: selectedSprint.label,
                    });
                  }
                }}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {filteredSprints.map(sprint => (
                  <option key={sprint.label} value={sprint.label}>
                    {sprint.label} ({formatDateWithRelease(sprint.start)} - {formatDateWithRelease(sprint.end)})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {editFeatureId ? 'Save Changes' : 'Add Feature'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Add function to reset data to sample data
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data to sample data? This cannot be undone.')) {
      // Reset raw features with clean sample data (no sprintAllocation or releaseDate)
      setRawFeatures(initializeSampleData(sampleData));

      // Reset sprint capacities to default
      const initialCapacities: Record<string, { devMembers: number; qaMembers: number }> = {};
      SPRINTS_2025.forEach(sprint => {
        initialCapacities[sprint.label] = { devMembers: 5, qaMembers: 5 };
      });
      setSprintCapacities(initialCapacities);
      setSelectedQuarter(QUARTERS[1]); // Reset selected quarter to default
    }
  };

  // In the TeamPlanningPage component, update the useEffect that handles quarter changes
  const [currentReleases, setCurrentReleases] = useState<Release[]>(getReleasesForQuarter(selectedQuarter));
  const [selectedReleaseDetail, setSelectedReleaseDetail] = useState<Release | null>(null); // New state for detailed view

  // Update useEffect to handle quarter changes
  useEffect(() => {
    const newReleases = getReleasesForQuarter(selectedQuarter);
    setCurrentReleases(newReleases);
    // Update the schedule with the new releases
    const reScheduledFeatures = recalculateSchedule(rawFeatures, SPRINTS_2025, sprintCapacities, newReleases);
    setFeatures(reScheduledFeatures);
  }, [selectedQuarter, rawFeatures, sprintCapacities]);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Team Planning</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetData}
              className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reset to Sample Data
            </button>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {QUARTERS.map(quarter => (
                <option key={quarter} value={quarter}>{quarter}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* View Tabs */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveView('table')}
              className={`px-4 py-2 rounded-md ${
                activeView === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiList className="inline-block mr-2" />
              Intakes
            </button>
            <button
              onClick={() => setActiveView('capacity')}
              className={`px-4 py-2 rounded-md ${
                activeView === 'capacity'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiUsers className="inline-block mr-2" />
              Capacity View
            </button>
            <button
              onClick={() => setActiveView('timeline')}
              className={`px-4 py-2 rounded-md ${
                activeView === 'timeline'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiBarChart2 className="inline-block mr-2" />
              Timeline View
            </button>
          </div>

          {/* Filters Section */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Team:</label>
              <select
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value as 'all' | 'YC' | 'FC')}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Teams</option>
                <option value="YC">YC</option>
                <option value="FC">FC</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Priority:</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as 'all' | 'High' | 'Medium' | 'Low')}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            {activeView === 'table' && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="md:ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="inline-block mr-2" />
                Add Feature
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeView === 'table' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Epic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dev Effort</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QA Effort</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Effort</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Sprint</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.epic}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.team}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><PriorityBadge priority={item.priority} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.devEffort}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.qaEffort}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalEffort}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.startSprint}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900"><FiEdit2 /></button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(startIndex + itemsPerPage, sortedData.length)}
                  </span>{' '}
                  of <span className="font-medium">{sortedData.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'capacity' && (
        <TeamCapacityOverview
          sprintCapacities={sprintCapacities}
          setSprintCapacities={setSprintCapacities}
          features={features}
          setRawFeatures={setRawFeatures}
          sprints={SPRINTS_2025}
        />
      )}

      {activeView === 'timeline' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Release Timeline</h2>
              <p className="text-sm text-gray-500 mt-1">Showing data for {selectedQuarter}</p>
            </div>
          </div>

          {/* Release Timeline Summary */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
            <div className="relative flex justify-between">
              {getReleasesForQuarter(selectedQuarter).map((release, index) => {
                const releaseDate = new Date(release.date);
                const today = new Date();
                const isCurrentRelease = releaseDate >= today && 
                  (index === 0 || new Date(getReleasesForQuarter(selectedQuarter)[index - 1].date) < today);
                const isCompleted = releaseDate < today;
                
                const epicsInRelease = filteredData.filter(epic => 
                  epic.releaseDate && new Date(epic.releaseDate).toDateString() === releaseDate.toDateString()
                );

                const totalEffort = epicsInRelease.reduce((sum, epic) => sum + epic.devEffort + epic.qaEffort, 0);

                return (
                  <div key={release.label} className="relative flex flex-col items-center">
                    {/* Release Dot */}
                    <div className={`w-4 h-4 rounded-full border-4 transform -translate-y-1/2 ${
                      isCurrentRelease 
                        ? 'border-blue-500 bg-blue-100 animate-pulse' 
                        : isCompleted 
                          ? 'border-green-500 bg-green-100'
                          : 'border-yellow-500 bg-yellow-100'
                    }`}></div>

                    {/* Release Info */}
                    <div 
                      className={`mt-2 text-center cursor-pointer ${selectedReleaseDetail?.label === release.label ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
                      onClick={() => setSelectedReleaseDetail(selectedReleaseDetail?.label === release.label ? null : release)}
                    >
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isCurrentRelease 
                          ? 'bg-blue-100 text-blue-800' 
                          : isCompleted 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {release.label.split('_')[0]}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {formatDate(release.date)}
                      </div>
                      <div className="mt-1">
                        <div className="text-sm font-medium text-gray-700">
                          {epicsInRelease.length} Epics
                        </div>
                        <div className="text-xs text-gray-500">
                          {totalEffort} days
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Release Detail View */}
          {selectedReleaseDetail && (
            <div className="mt-8 p-6 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Details for {selectedReleaseDetail.label.split('_')[0]}</h3>
                <button
                  onClick={() => setSelectedReleaseDetail(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredData
                  .filter(epic => epic.releaseDate && new Date(epic.releaseDate).toDateString() === new Date(selectedReleaseDetail.date).toDateString())
                  .map(epic => (
                    <div
                      key={epic.id}
                      className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                      onClick={() => handleEdit(epic)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {epic.epic}
                        </h4>
                        <PriorityBadge priority={epic.priority} />
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiUsers className="mr-2 text-blue-500" />
                          <span>{epic.team}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiCalendar className="mr-2 text-green-500" />
                          <span>Start: {formatDate(epic.sprintStart)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiCalendar className="mr-2 text-purple-500" />
                          <span>Release: {epic.releaseDate ? formatDate(epic.releaseDate) : 'TBD'}</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                              <p className="text-xs font-medium text-gray-500">Dev</p>
                              <p className="text-sm font-bold text-blue-600">{epic.devEffort}d</p>
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                              <p className="text-xs font-medium text-gray-500">QA</p>
                              <p className="text-sm font-bold text-green-600">{epic.qaEffort}d</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {filteredData.filter(epic => epic.releaseDate && new Date(epic.releaseDate).toDateString() === new Date(selectedReleaseDetail.date).toDateString()).length === 0 && (
                  <div className="text-center py-8 col-span-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <FiCalendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No epics assigned to this release yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Unassigned Epics Section */}
          <div className="mt-8">
            <div className="flex items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Unassigned Epics</h3>
              <div className="ml-4 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                {filteredData.filter(epic => !epic.releaseDate).length} items
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredData
                .filter(epic => !epic.releaseDate)
                .map(epic => (
                  <div
                    key={epic.id}
                    className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer"
                    onClick={() => handleEdit(epic)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {epic.epic}
                      </h4>
                      <PriorityBadge priority={epic.priority} />
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiUsers className="mr-2 text-blue-500" />
                        <span>{epic.team}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiCalendar className="mr-2 text-green-500" />
                        <span>Start: {formatDate(epic.sprintStart)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiCalendar className="mr-2 text-purple-500" />
                        <span>Release: {epic.releaseDate ? formatDate(epic.releaseDate) : 'TBD'}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-500">Dev</p>
                            <p className="text-sm font-bold text-blue-600">{epic.devEffort}d</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-500">QA</p>
                            <p className="text-sm font-bold text-green-600">{epic.qaEffort}d</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {isFormOpen && <FormModal />}
    </div>
  );
} 