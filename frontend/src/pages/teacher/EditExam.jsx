import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const EditExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    title: '',
    subject: '',
    duration: 60,
    questions: []
  });

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem('exams') || '[]');
    const examData = storedExams.find(exam => exam.id === parseInt(id));
    if (examData) {
      setExam(examData);
    } else {
      // If exam not found, initialize empty
      setExam({
        title: '',
        subject: '',
        duration: 60,
        questions: []
      });
    }
  }, [id]);

  const handleSave = () => {
    const storedExams = JSON.parse(localStorage.getItem('exams') || '[]');
    const updatedExams = storedExams.map(e => e.id === parseInt(id) ? exam : e);
    localStorage.setItem('exams', JSON.stringify(updatedExams));
    console.log('Saving exam:', exam);
    navigate('/teacher');
  };

  const handleCancel = () => {
    navigate('/teacher');
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Exam</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              value={exam.title}
              onChange={(e) => setExam({ ...exam, title: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
            <input
              type="text"
              value={exam.subject}
              onChange={(e) => setExam({ ...exam, subject: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={exam.duration}
              onChange={(e) => setExam({ ...exam, duration: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExam;
