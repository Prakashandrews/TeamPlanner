"use client";
import { useState } from 'react';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  dateOfJoin: string;
  experience: number;
  role: string;
  department: string;
  salary: number;
  address: string;
  skills: string;
}

const EXAMPLE_MEMBERS: TeamMember[] = Array.from({ length: 30 }, (_, i) => ({
  name: `Member ${i + 1}`,
  email: `member${i + 1}@company.com`,
  phone: `+1-555-${(1000 + i).toString().padStart(4, '0')}`,
  dateOfJoin: `2022-${(i % 12 + 1).toString().padStart(2, '0')}-01`,
  experience: 1 + (i % 15),
  role: i % 3 === 0 ? 'Senior Developer' : i % 3 === 1 ? 'QA Engineer' : 'Product Manager',
  department: i % 4 === 0 ? 'Engineering' : i % 4 === 1 ? 'Quality Assurance' : i % 4 === 2 ? 'Product' : 'Design',
  salary: 50000 + (i * 2000),
  address: `Address ${i + 1}, City ${(i % 5) + 1}`,
  skills: i % 2 === 0 ? 'React, TypeScript, Node.js' : 'Python, Django, PostgreSQL'
}));

export default function TeamMembersPage() {
  const [members, setMembers] = useState<TeamMember[]>(EXAMPLE_MEMBERS);
  const [form, setForm] = useState<TeamMember>({ 
    name: '', 
    email: '', 
    phone: '', 
    dateOfJoin: '', 
    experience: 0, 
    role: '',
    department: '',
    salary: 0,
    address: '', 
    skills: '' 
  });
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageSize = 10;
  const totalPages = Math.ceil(members.length / pageSize);
  const paginated = members.slice((page - 1) * pageSize, page * pageSize);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'experience' || name === 'salary' ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers([...members, form]);
    setForm({ 
      name: '', 
      email: '', 
      phone: '', 
      dateOfJoin: '', 
      experience: 0, 
      role: '',
      department: '',
      salary: 0,
      address: '', 
      skills: '' 
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
      name: '', 
      email: '', 
      phone: '', 
      dateOfJoin: '', 
      experience: 0, 
      role: '',
      department: '',
      salary: 0,
      address: '', 
      skills: '' 
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">Team Members</h1>
        <button 
          onClick={openModal}
          className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Member
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Salary</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginated.map((member, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Joined: {member.dateOfJoin}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{member.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{member.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{member.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      {member.experience} yrs
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${member.salary.toLocaleString()}</td>
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

      {/* Add Member Modal */}
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Team Member</h3>
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter member name"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Join</label>
                      <input
                        name="dateOfJoin"
                        value={form.dateOfJoin}
                        onChange={handleChange}
                        type="date"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years of Experience</label>
                      <input
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        type="number"
                        min="0"
                        placeholder="Enter years of experience"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role/Position</label>
                      <input
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        placeholder="Enter role/position"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                      <select
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      >
                        <option value="">Select department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Quality Assurance">Quality Assurance</option>
                        <option value="Product">Product</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salary</label>
                      <input
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        type="number"
                        min="0"
                        placeholder="Enter salary"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base px-4 py-3 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills</label>
                    <textarea
                      name="skills"
                      value={form.skills}
                      onChange={handleChange}
                      placeholder="Enter skills (comma separated)"
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
                    Add Member
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