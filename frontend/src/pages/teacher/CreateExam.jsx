import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const CreateExam = () => {
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    title: '',
    subject: '',
    duration: 60,
    questions: []
  });
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    marks: 5
  });

  const handleSave = () => {
    // Logic to create new exam
    const newExam = { ...exam, id: Date.now(), status: 'Draft', students: 0 };
    const existingExams = JSON.parse(localStorage.getItem('exams') || '[]');
    existingExams.push(newExam);
    localStorage.setItem('exams', JSON.stringify(existingExams));
    console.log('Creating new exam:', newExam);
    navigate('/teacher');
  };

  const handleCancel = () => {
    navigate('/teacher');
  };

  const handleAddQuestion = () => {
    if (newQuestion.question.trim()) {
      setExam({ ...exam, questions: [...exam.questions, { ...newQuestion, id: Date.now() }] });
      setNewQuestion({
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        marks: 5
      });
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Exam</h1>
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
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Questions</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Question</label>
              <textarea
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                placeholder="Enter question text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
              <select
                value={newQuestion.type}
                onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="open-ended">Open Ended</option>
              </select>
            </div>
            {newQuestion.type === 'multiple-choice' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Options</label>
                {newQuestion.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Marks</label>
              <input
                type="number"
                value={newQuestion.marks}
                onChange={(e) => setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              onClick={handleAddQuestion}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
            >
              Add Question
            </button>
            {exam.questions.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Added Questions</h3>
                <ul className="list-disc list-inside">
                  {exam.questions.map((q, index) => (
                    <li key={index} className="mb-1">
                      {q.question} ({q.type}, {q.marks} marks)
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              Create Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
