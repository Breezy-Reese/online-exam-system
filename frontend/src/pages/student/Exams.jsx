import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Exams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams from localStorage
    const storedExams = JSON.parse(localStorage.getItem('exams') || '[]');
    setExams(storedExams);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Available Exams</h1>
        <div className="space-y-4">
          {exams.map((exam) => (
            <div key={exam.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{exam.title}</h2>
              <p>Subject: {exam.subject}</p>
              <p>Duration: {exam.duration} minutes</p>
              <Link to={`/exam/${exam.id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Take Exam
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exams;
