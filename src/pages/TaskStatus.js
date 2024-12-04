


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../components/UserContext"; // Import the UserContext

const ExecuteScriptComponent = () => {
  const [error, setError] = useState('');
  const { taskData, setTaskData } = useContext(UserContext); // Access context

  // const handleExecuteScript = async () => {
  //   const data = {
  //     ip: '10.10.237.146',
  //     username: 'master',
  //     password: 'master',
  //     scriptPath: '/home/master/verify.sh',
  //   };

  //   try {
  //     const response = await axios.post('http://localhost:4000/api/execute-script', data);

  //     // Mock data for test cases from the response
  //     const mockTestCaseResults = Array.from({ length: 10 }, (_, idx) => ({
  //       task: `Task ${idx + 1}`,
  //       status: idx % 2 === 0 ? 'Completed Successfully' : 'Failed', // Mocking alternate statuses
  //       isSuccess: idx % 2 === 0,
  //     }));

  //     setTaskData({
  //       output: response.data.output,
  //       timestamp: new Date().toISOString(),
  //       testCases: mockTestCaseResults, // Store test case results
  //     });

  //     setError('');
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Failed to execute script');
  //     setTaskData({
  //       output: '',
  //       error: err.response?.data?.error || 'Failed to execute script',
  //       testCases: [], // Clear test case results on error
  //     });
  //   }
  // };

  // return (
  //   <div style={{ padding: '20px' }}>
  //     <button  className="bg-blue-600 hover:bg-blue-700 focus:ring-4  font-medium rounded-lg text-sm px-7 py-2.5 focus:outline-none transition-all duration-300" onClick={handleExecuteScript} style={{ padding: '10px 20px', fontSize: '16px' }}>
  //       verify
  //     </button>
  //     {/* <div style={{ marginTop: '20px' }}>
  //       <h3>Output:</h3>
  //       <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
  //         {taskData?.output || 'No output yet'}
  //       </pre>
  //     </div> */}
  //     {error && (
  //       <div style={{ marginTop: '20px', color: 'red' }}>
  //         <h3>Error:</h3>
  //         <pre>{error}</pre>
  //       </div>
  //     )}
  //   </div>
  // );
  const handleExecuteScript = async () => {
    const data = {
      ip: '10.10.237.146',
      username: 'master',
      password: 'master',
      scriptPath: '/home/master/verify.sh',
    };
  
    try {
      const response = await axios.post('http://localhost:4000/api/execute-script', data);
  
      // Process the script output into structured test cases
      const rawOutput = response.data.output; // Assuming `output` is the raw text (e.g., "1:0\n2:0\n...")
      const testCaseResults = rawOutput
        .trim()
        .split('\n') // Split by newline to get each "task:status" pair
        .map((line) => {
          const [task, status] = line.split(':'); // Split by ":"
          return {
            task: `Task ${task.trim()}`,
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
      {/* <div style={{ marginTop: '20px' }}>
        <h3>Output:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {taskData?.output || 'No output yet'}
        </pre>
      </div> */}
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
