// import React, { useEffect, useRef } from 'react';
// import { Terminal } from 'xterm';
// import 'xterm/css/xterm.css';
// import io from 'socket.io-client';

// const TerminalComponent = () => {
//   const terminalRef = useRef(null);
//   const socketRef = useRef(null);
//   const xtermRef = useRef(null);

//   useEffect(() => {
//     xtermRef.current = new Terminal({
//       cursorBlink: true,
//       cursorStyle: 'bar', // Bar-style cursor
//       cols: 80,
//       rows: 30,
//       theme: {

//         background: '#1e1e1e', // Dark background
//         foreground: '#f5f5f5', // Light gray text
//         cursor: '#00ff00', // Green cursor
//       },
//       fontSize: 17, // Slightly larger font
//       fontWeight: '500',
//       fontFamily: `'JetBrains Mono', 'Consolas', 'Courier New', monospace`, // Stylish monospace font
//     });
//     xtermRef.current.open(terminalRef.current);

//     socketRef.current = io('http://localhost:4000', { transports: ['websocket'] });

//     // Handle data received from the backend
//     socketRef.current.on('data', (data) => {
//       xtermRef.current.write(data); // Write raw data directly to terminal
//     });

//     // Send raw user input to the backend
//     xtermRef.current.onData((input) => {
//       socketRef.current.emit('command', input); // Send raw input to backend
//     });

//     // Notify backend of terminal size changes
//     const handleResize = () => {
//       socketRef.current.emit('resize', {
//         rows: xtermRef.current.rows,
//         cols: xtermRef.current.cols,
//       });
//     };

//     xtermRef.current.onResize(handleResize);

//     // Establish SSH connection
//     socketRef.current.emit('ssh-connect', {
//       host: '10.10.237.146',
//       port: 22,
//       username: 'master',
//       password: 'master', // Replace with secure method
//     });

//     // Cleanup
//     return () => {
//       socketRef.current.disconnect();
//       xtermRef.current.dispose();
//     };
//   }, []);

//   return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
// };

// export default TerminalComponent;


import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import io from 'socket.io-client';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const xtermRef = useRef(null);
  const [scriptOutput, setScriptOutput] = useState(''); // State to hold script output
  const [loading, setLoading] = useState(false); // Loading state for the button

  useEffect(() => {
    // Initialize terminal
    xtermRef.current = new Terminal({
      cursorBlink: true,
      cursorStyle: 'bar',
      cols: 80,
      rows: 30,
      theme: {
        background: '#1e1e1e',
        foreground: '#f5f5f5',
        cursor: '#00ff00',
      },
      fontSize: 17,
      fontWeight: '500',
      fontFamily: `'JetBrains Mono', 'Consolas', 'Courier New', monospace`,
    });
    xtermRef.current.open(terminalRef.current);

    // Connect to socket
    socketRef.current = io('http://localhost:4000', { transports: ['websocket'] });

    // Handle data received from the backend
    socketRef.current.on('data', (data) => {
      xtermRef.current.write(data); // Write raw data directly to terminal
    });

    // Send raw user input to the backend
    xtermRef.current.onData((input) => {
      socketRef.current.emit('command', input);
    });

    // Notify backend of terminal size changes
    const handleResize = () => {
      socketRef.current.emit('resize', {
        rows: xtermRef.current.rows,
        cols: xtermRef.current.cols,
      });
    };
    xtermRef.current.onResize(handleResize);

    // Establish SSH connection
    socketRef.current.emit('ssh-connect', {
      host: '10.10.237.146',
      port: 22,
      username: 'master',
      password: 'master', // Replace with a secure method
    });

    // Cleanup
    return () => {
      socketRef.current.disconnect();
      xtermRef.current.dispose();
    };
  }, []);

  // Handle script execution
  const handleRunScript = async () => {
    setLoading(true);
    setScriptOutput(''); // Clear previous output
    try {
      const response = await fetch('http://localhost:4000/api/check-tasks');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setScriptOutput(data.output);
    } catch (error) {
      setScriptOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Terminal Section */}
      <div ref={terminalRef} style={{ flex: 1, border: '1px solid #333', overflow: 'hidden' }} />

      {/* Script Output Section */}
      <div style={{ padding: '10px', backgroundColor: '#1e1e1e', color: '#f5f5f5' }}>
        <button
          onClick={handleRunScript}
          disabled={loading}
          style={{
            marginBottom: '10px',
            padding: '10px 20px',
            backgroundColor: '#00ff00',
            color: '#1e1e1e',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Running...' : 'Run Script'}
        </button>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{scriptOutput}</pre>
      </div>
    </div>
  );
};

export default TerminalComponent;
