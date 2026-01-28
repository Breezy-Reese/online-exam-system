import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TakenExam = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch exam data from localStorage based on id
    const storedExams = JSON.parse(localStorage.getItem('exams') || '[]');
    const foundExam = storedExams.find(exam => exam.id == id);
    if (foundExam) {
      // Organize questions into sections (for now, all in one section)
      const sections = [
        {
          name: 'Section A',
          totalMarks: foundExam.questions.reduce((sum, q) => sum + q.marks, 0),
          questions: foundExam.questions.map((q, index) => ({ ...q, id: index + 1 }))
        }
      ];
      setExam({
        id: foundExam.id,
        title: foundExam.title,
        subject: foundExam.subject,
        sections
      });
    } else {
      // Fallback to placeholder if not found
      setExam({
        id,
        title: `Exam ${id}`,
        subject: 'Unknown',
        sections: []
      });
    }
    setLoading(false);
  }, [id]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    // Submit answers and store result
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    const newResult = {
      id: Date.now(),
      examId: exam.id,
      userId: 1, // Assuming current user ID, in real app get from auth context
      answers,
      submittedAt: new Date().toISOString()
    };
    results.push(newResult);
    localStorage.setItem('results', JSON.stringify(results));
    // Navigate to result page
    navigate('/result');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{exam.title}</h1>
      {exam.sections.map((section) => (
        <div key={section.name} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{section.name} ({section.totalMarks} marks)</h2>
          {section.questions.map((q) => (
            <div key={q.id} className="mb-6">
              <p className="text-lg font-medium mb-2">{q.question} ({q.marks} marks)</p>
              {q.type === 'multiple-choice' ? (
                q.options.map((option) => (
                  <label key={option} className="block mb-1">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))
              ) : (
                <textarea
                  name={`question-${q.id}`}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Enter your answer here..."
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit Exam</button>
    </div>
  );
};

export default TakenExam;
