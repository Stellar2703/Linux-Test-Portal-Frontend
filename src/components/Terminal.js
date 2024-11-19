// // import React, { useEffect, useRef } from 'react';
// // import { Terminal } from 'xterm';
// // import 'xterm/css/xterm.css';
// // import io from 'socket.io-client';
// // // import './TerminalComponent.css'; 
// // const TerminalComponent = () => {
// //   const terminalRef = useRef(null);
// //   const socketRef = useRef(null);
// //   const xtermRef = useRef(null);
// //   const inputBuffer = useRef(''); // Buffer to hold typed input

// //   useEffect(() => {
// //     // Initialize xterm.js terminal
// //     xtermRef.current = new Terminal({
// //       cursorBlink: true,
// //       cols: 80,
// //       rows: 24,
// //     });
// //     xtermRef.current.open(terminalRef.current);

// //     // Establish socket connection
// //     socketRef.current = io('http://localhost:4000', {
// //       transports: ['websocket'],
// //     });

// //     // Handle data received from the backend
// //     socketRef.current.on('data', (data) => {
// //     xtermRef.current.write(data.toString()); // Display server response in terminal
// //     });

// //     // Handle user input and buffer until Enter key is pressed
// //     xtermRef.current.onData((input) => {
// //       if (input === '\r') { // Enter key
// //         // Instead of displaying the input, we will not write it to terminal
// //         socketRef.current.emit('command', inputBuffer.current); // Send command to server
        
// //         // Add a new line for the command output
// //         xtermRef.current.write('\r\n'); // Adds a new line for separation
        
// //         inputBuffer.current = ''; // Clear input buffer after sending
// //       } else if (input === '\u007F') { // Handle backspace
// //         if (inputBuffer.current.length > 0) {
// //           inputBuffer.current = inputBuffer.current.slice(0, -1);
// //           xtermRef.current.write('\b \b'); // Remove last character from display
// //         }
// //       } else {
// //         inputBuffer.current += input; // Append input to buffer
// //         xtermRef.current.write(input); // Display typed character in terminal
// //       }
// //     });

// //     // Initialize SSH connection (replace with actual credentials or authentication method)
// //     socketRef.current.emit('ssh-connect', {
// //       host: '10.10.237.146',
// //       port: 22,
// //       username: 'master',
// //       password: 'master', // Or use an SSH key if preferred
// //     });

// //     // Cleanup on component unmount
// //     return () => {
// //       if (socketRef.current) socketRef.current.disconnect();
// //       if (xtermRef.current) xtermRef.current.dispose();
// //     };
// //   }, []);

// //   return (<div className="terminal" style={{width:"760px"}} ref={terminalRef} />  );
// // };

// // export default TerminalComponent;


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
//       cols: 80,
//       rows: 34,
//       theme: {
//         background: '#000000', // Optional: Custom styling
//         foreground: '#ffffff',
//       },
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

//   return <div ref={terminalRef} />;
// };

// export default TerminalComponent;


import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import io from 'socket.io-client';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const xtermRef = useRef(null);

  useEffect(() => {
    xtermRef.current = new Terminal({
      cursorBlink: true,
      cols: 80,
      rows: 34,
      theme: {
        background: '#1e1e1e', // Dark background
        foreground: '#dcdcdc', // Light gray text
        cursor: '#00ff00', // Green cursor
      },
      fontSize: 14, // Slightly larger font
      fontFamily: `'Fira Code', 'Courier New', monospace`, // Stylish monospace font
    });
    xtermRef.current.open(terminalRef.current);

    socketRef.current = io('http://localhost:4000', { transports: ['websocket'] });

    // Handle data received from the backend
    socketRef.current.on('data', (data) => {
      xtermRef.current.write(data); // Write raw data directly to terminal
    });

    // Send raw user input to the backend
    xtermRef.current.onData((input) => {
      socketRef.current.emit('command', input); // Send raw input to backend
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
      password: 'master', // Replace with secure method
    });

    // Cleanup
    return () => {
      socketRef.current.disconnect();
      xtermRef.current.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalComponent;
