import React, { useState, useEffect } from 'react';

const TaskChecker = () => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the script output from the backend
    fetch('http://localhost:4000/api/check-tasks')
      .then((response) => response.json())
      .then((data) => {
        if (data.output) {
          setOutput(data.output); // Set the script output
        } else {
          setError(data.message || 'Failed to fetch tasks output');
        }
      })
      .catch((err) => {
        setError('Error fetching task output: ' + err.message);
      });
  }, []);

  return (
    <div>
      <h1>Task Status</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <pre>{output}</pre> // Display the script output
      )}
    </div>
  );
};

export default TaskChecker;
