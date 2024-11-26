import React, { useState } from 'react';
import axios from 'axios';

const Terminal = () => {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Function to trigger the execution of the script
  const executeScript = async () => {
    setLoading(true);
    setOutput(''); // Clear previous output

    try {
      const response = await axios.post('http://localhost:4000/api/execute-script', {
        scriptPath: '/path/to/your/script.sh', // Path to the script on the remote system
      });

      // Display the output from the script
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing script:', error);
      setOutput('Error executing script');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={executeScript} disabled={loading}>
        {loading ? 'Executing...' : 'Run Script'}
      </button>
      <div>
        <h3>Script Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Terminal;
