import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    exams: 0,
    results: 0
  });
  const [users, setUsers] = useState([]);
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    localStorage: 'Checking...',
    dataIntegrity: 'Checking...'
  });

  useEffect(() => {
    // Fetch data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const storedExams = JSON.parse(localStorage.getItem('exams') || '[]');
    const storedResults = JSON.parse(localStorage.getItem('results') || '[]');

    setStats({
      users: storedUsers.length,
      exams: storedExams.length,
      results: storedResults.length
    });
    setUsers(storedUsers);
    setExams(storedExams);
    setResults(storedResults);

    // Check system health
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      setSystemHealth(prev => ({ ...prev, localStorage: 'Healthy' }));
    } catch (e) {
      setSystemHealth(prev => ({ ...prev, localStorage: 'Error' }));
    }

    // Basic data integrity check
    const integrity = storedUsers.every(u => u.id && u.email) &&
                      storedExams.every(e => e.id && e.title) &&
                      storedResults.every(r => r.id && r.examId);
    setSystemHealth(prev => ({ ...prev, dataIntegrity: integrity ? 'Good' : 'Issues detected' }));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* System Health Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium">LocalStorage Status</h3>
              <p className={systemHealth.localStorage === 'Healthy' ? 'text-green-600' : 'text-red-600'}>
                {systemHealth.localStorage}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium">Data Integrity</h3>
              <p className={systemHealth.dataIntegrity === 'Good' ? 'text-green-600' : 'text-red-600'}>
                {systemHealth.dataIntegrity}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Total Users</h3>
              <p className="text-2xl font-bold">{stats.users}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Total Exams</h3>
              <p className="text-2xl font-bold">{stats.exams}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Total Results</h3>
              <p className="text-2xl font-bold">{stats.results}</p>
            </div>
          </div>
        </div>

        {/* Lists Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Users</h3>
            <ul className="space-y-1">
              {users.map(user => (
                <li key={user.id} className="text-sm">{user.name} ({user.role})</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Exams</h3>
            <ul className="space-y-1">
              {exams.map(exam => (
                <li key={exam.id} className="text-sm">{exam.title}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Results</h3>
            <ul className="space-y-1">
              {results.map(result => (
                <li key={result.id} className="text-sm">Exam {result.examId} - {new Date(result.submittedAt).toLocaleDateString()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
