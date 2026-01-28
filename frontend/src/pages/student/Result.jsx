import React from 'react';
import Navbar from '../../components/Navbar';

const Result = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Exam Result</h1>
        <p>Your exam has been submitted. Results will be available soon.</p>
        {/* Add result display logic here */}
      </div>
    </div>
  );
};

export default Result;
