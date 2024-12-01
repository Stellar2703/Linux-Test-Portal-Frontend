// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { UserContext } from "../components/UserContext"; // Import the UserContext

// const ExecuteScriptComponent = () => {
//   const [error, setError] = useState('');
//   const { taskData, setTaskData } = useContext(UserContext); // Access context

//   const handleExecuteScript = async () => {
//     const data = {
//       ip: '10.10.237.146', // Replace with dynamic IP if needed
//       username: 'master',
//       password: 'master', // Replace with secure method to handle credentials
//       scriptPath: '/home/master/verify.sh', // Replace with the path to your script
//     };

//     try {
//       const response = await axios.post('http://localhost:4000/api/execute-script', data);
//       setTaskData({ output: response.data.output, timestamp: new Date().toISOString() }); // Store output in context
//       setError(''); // Clear any previous errors
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to execute script');
//       setTaskData({ output: '', error: err.response?.data?.error || 'Failed to execute script' }); // Store error in context
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <button onClick={handleExecuteScript} style={{ padding: '10px 20px', fontSize: '16px' }}>
//         Execute Script
//       </button>
//       <div style={{ marginTop: '20px' }}>
//         <h3>Output:</h3>
//         <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
//           {taskData?.output || 'No output yet'}
//         </pre>
//       </div>
//       {error && (
//         <div style={{ marginTop: '20px', color: 'red' }}>
//           <h3>Error:</h3>
//           <pre>{error}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExecuteScriptComponent;


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../components/UserContext"; // Import the UserContext

const ExecuteScriptComponent = () => {
  const [error, setError] = useState('');
  const { taskData, setTaskData } = useContext(UserContext); // Access context

  const handleExecuteScript = async () => {
    const data = {
      ip: '10.10.237.146',
      username: 'master',
      password: 'master',
      scriptPath: '/home/master/verify.sh',
    };

    try {
      const response = await axios.post('http://localhost:4000/api/execute-script', data);

      // Mock data for test cases from the response
      const mockTestCaseResults = Array.from({ length: 10 }, (_, idx) => ({
        task: `Task ${idx + 1}`,
        status: idx % 2 === 0 ? 'Completed Successfully' : 'Failed', // Mocking alternate statuses
        isSuccess: idx % 2 === 0,
      }));

      setTaskData({
        output: response.data.output,
        timestamp: new Date().toISOString(),
        testCases: mockTestCaseResults, // Store test case results
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
      <button onClick={handleExecuteScript} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Execute Script
      </button>
      <div style={{ marginTop: '20px' }}>
        <h3>Output:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {taskData?.output || 'No output yet'}
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
