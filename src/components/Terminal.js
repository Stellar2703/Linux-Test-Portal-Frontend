// import React, { useEffect, useRef, useContext } from 'react';
// import { Terminal } from 'xterm';
// import 'xterm/css/xterm.css';
// import io from 'socket.io-client';
// import { UserContext } from './UserContext';

// const TerminalComponent = () => {
//   const terminalRef = useRef(null);
//   const socketRef = useRef(null);
//   const xtermRef = useRef(null);
//  const { userData } = useContext(UserContext);
//  console.log(userData.ip);  
//  console.log(userData.systemUser.username);  
//  console.log(userData.systemUser.password);  
//   useEffect(() => {
//     xtermRef.current = new Terminal({
//       cursorBlink: true,
//       // cursorStyle: 'bar', // Bar-style cursor
//       cols: 80,
//       rows: 27, 
//       theme: {

//         background: '#000000', // Dark background
//         foreground: '#ffffff', // Light gray text
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
//       host: userData.ip,
//       port: 22,
//       username: userData.systemUser.username,
//       password: userData.systemUser.username, // Replace with secure method
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


import React, { useEffect, useRef, useContext } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import io from 'socket.io-client';
import { UserContext } from './UserContext';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const xtermRef = useRef(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    let commandBuffer = ''; // Buffer to store the current input

    // Initialize xterm.js terminal
    xtermRef.current = new Terminal({
      cursorBlink: true,
      cols: 80,
      rows: 27,
      theme: {
        background: '#000000', // Dark background
        foreground: '#ffffff', // Light gray text
        cursor: '#00ff00', // Green cursor
      },
      fontSize: 17,
      fontWeight: '500',
      fontFamily: `'JetBrains Mono', 'Consolas', 'Courier New', monospace`,
    });
    xtermRef.current.open(terminalRef.current);

    // Initialize socket.io connection
    socketRef.current = io('http://localhost:4000', { transports: ['websocket'] });

    // Handle data received from the backend
    socketRef.current.on('data', (data) => {
      xtermRef.current.write(data); // Write raw data directly to the terminal
    });

    // Intercept and process user input
    xtermRef.current.onData((input) => {
      if (input === '\r') {
        // User pressed Enter
        const blockedCommands = ['rm -rf', 'shutdown', 'reboot','ip a']; // List of blocked commands
        const inputTrimmed = commandBuffer.trim(); // Trim whitespace

        // Don't print input again after Enter
        xtermRef.current.write('\r\n'); // Move to the next line, without printing input

        if (blockedCommands.some((cmd) => inputTrimmed.startsWith(cmd))) {
          xtermRef.current.writeln('\r\nCommand is not allowed.\r\n'); // Feedback to the user
        } else {
          socketRef.current.emit('command', commandBuffer + '\n'); // Send command to backend
        }

        // Clear the buffer after processing
        commandBuffer = '';
      } else if (input === '\u007F') {
        // Handle backspace
        commandBuffer = commandBuffer.slice(0, -1);
        xtermRef.current.write('\b \b'); // Erase character visually
      } else {
        // Add input to buffer
        commandBuffer += input;
        xtermRef.current.write(input); // Display the input without extra printing
      }
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
      host: userData.ip,
      port: 22,
      username: userData.systemUser.username,
      password: userData.systemUser.password,
    });

    // Cleanup
    return () => {
      socketRef.current.disconnect();
      xtermRef.current.dispose();
    };
  }, [userData]);

  return <div ref={terminalRef} />;
};

export default TerminalComponent;
