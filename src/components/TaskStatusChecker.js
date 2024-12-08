


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "./UserContext"; // Import the UserContext

const ExecuteScriptComponent = () => {
  const [error, setError] = useState('');
  const { taskData, setTaskData } = useContext(UserContext); // Access context
  const {userData} = useContext(UserContext);
  const handleExecuteScript = async () => {
    const data = {
      ip: userData.ip,     
      username: userData.systemUser.username,
      password: userData.systemUser.password,
      scriptPath: '/home/{userData.systemUser.username}/verify.sh',
    };
  
    try {
      const response = await axios.post('http://localhost:4000/api/execute-script', data);
  
      // Process the script output into structured test cases
      const rawOutput = response.data.output; // Assuming `output` is the raw text (e.g., "1:0\n2:0\n...")
      console.log(taskData)
      
      const testCaseResults = rawOutput
        .trim()
        .split('\n') // Split by newline to get each "task:status" pair
        .map((line) => {
          const [task, status] = line.split(':'); // Split by ":"
          return {
            task: ` ${task.trim()}`,
            status: status.trim() === '1' ? 'Completed Successfully' : 'Failed',
            isSuccess: status.trim() === '1', // Success if status is "1"
          };
        });
        
      setTaskData({
        output: rawOutput, // Store raw output for reference
        timestamp: new Date().toISOString(),
        testCases: testCaseResults, // Store processed test case results
      });
  
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to execute script');
      setTaskData({
        output: '',
        error: err.response?.data?.error || 'Failed to execute script',
        testCases: [], // Clear test case results on error
      });
    }
  };
    return (
    <div style={{ padding: '20px' }}>
      <button  className="bg-blue-600 hover:bg-blue-700 focus:ring-4  font-medium rounded-lg text-sm px-7 py-2.5 focus:outline-none transition-all duration-300" onClick={handleExecuteScript} style={{ padding: '10px 20px', fontSize: '16px' }}>
        verify
      </button>
      
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
