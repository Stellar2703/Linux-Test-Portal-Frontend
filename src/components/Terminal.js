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
      // cursorStyle: 'bar', // Bar-style cursor
      cols: 80,
      rows: 20, 
      theme: {

        background: '#000000', // Dark background
        foreground: '#ffffff', // Light gray text
        cursor: '#00ff00', // Green cursor
      },
      fontSize: 17, // Slightly larger font
      fontWeight: '500',
      fontFamily: `'JetBrains Mono', 'Consolas', 'Courier New', monospace`, // Stylish monospace font
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

  return <div ref={terminalRef} />;
};

export default TerminalComponent;
