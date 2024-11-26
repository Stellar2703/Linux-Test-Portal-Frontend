import React, { useState } from 'react';
import axios from 'axios';

const ExecuteScriptComponent = () => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleExecuteScript = async () => {
    const data = {
      ip: '10.10.237.146', // Replace with dynamic IP if needed
      username: 'master',
      password: 'master', // Replace with secure method to handle credentials
      scriptPath: '/home/master/verify.sh', // Replace with the path to your script
    };

    try {
      const response = await axios.post('http://localhost:4000/api/execute-script', data);
      setOutput(response.data.output); // Display script output
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to execute script');
      setOutput(''); // Clear previous output
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleExecuteScript} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Execute Script
      </button>
      <div style={{ marginTop: '20px' }}>
        <h3>Output:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {output || 'No output yet'}
        </pre>
      </div>
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default ExecuteScriptComponent;
