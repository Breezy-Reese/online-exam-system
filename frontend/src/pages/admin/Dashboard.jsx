import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState(() => JSON.parse(localStorage.getItem('exams') || '[]'));
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users') || '[]'));

  const handleManageUsers = () => {
    navigate('/manage-users');
  };

  const handleManageExams = () => {
    navigate('/manage-exams');
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="mb-6 space-x-4">
          <button
            onClick={handleManageUsers}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Manage Users
          </button>
          <button
            onClick={handleManageExams}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Manage Exams
          </button>
          <button
            onClick={handleViewReports}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            View Reports
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Exams Overview</h2>
            <p className="text-gray-600">Total Exams: {exams.length}</p>
            <p className="text-gray-600">Active Exams: {exams.filter(exam => exam.status === 'Active').length}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Users Overview</h2>
            <p className="text-gray-600">Total Users: {users.length}</p>
            <p className="text-gray-600">Students: {users.filter(user => user.role === 'student').length}</p>
            <p className="text-gray-600">Teachers: {users.filter(user => user.role === 'teacher').length}</p>
          </div>
        </div>

        <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold p-6">Recent Exams</h2>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exams.slice(0, 5).map((exam) => (
                <tr key={exam.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      exam.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {exam.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.createdBy || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
