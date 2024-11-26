import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import Mainpage from './pages/Mainpage';
import BookingPage from './pages/BookingPage';
import Test from './pages/Testpage';
import { UserProvider } from './components/UserContext';
import TaskStatus from './pages/TaskStatus';
import Terminal from './pages/TaskStatus';

function App() {
  useEffect(() => {
    // Fullscreen function
    const enterFullscreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
          console.error('Failed to enter fullscreen:', err);
        });
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen().catch((err) => {
          console.error('Failed to enter fullscreen (Webkit):', err);
        });
      }
    };

    // Function to handle visibility change event
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert('You are not allowed to switch tabs.');
        window.location.href = '/'; // Redirect to login or a safe page
      }
    };

    // Function to disable keyboard shortcuts (like Ctrl+T, Ctrl+W, Alt+Tab, etc.)
    const disableShortcuts = (e) => {
      const blockedKeys = [
        't', // Ctrl+T
        'n', // Ctrl+N
        'w', // Ctrl+W
        'r', // Ctrl+R
        'Tab', // Tab
        'F5', // F5 (refresh)
        'Alt', // Alt
        'Escape', // Escape
        'F11', // F11 (fullscreen)
        'Windows', // Windows key (or Command on Mac)
        'D', // Win+D (to show desktop)
      ];

      // Check if the key is in the blocked keys list
      if (
        (e.ctrlKey && blockedKeys.includes(e.key)) ||
        (e.altKey && e.key === 'Tab') ||
        e.key === 'F5' ||
        e.key === 'Escape' ||
        (e.metaKey && e.key === 'd')
      ) {
        e.preventDefault();
        alert('Keyboard shortcuts are disabled during this session.');
      }
    };

    // Disable right-click context menu
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', disableShortcuts);
    document.addEventListener('contextmenu', disableRightClick);

    // Prompt user to enter fullscreen and try to activate it
    alert('For the best experience, please enable fullscreen mode.');
    enterFullscreen();

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', disableShortcuts);
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Terminal />} />
            <Route path="/main" element={<Mainpage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/tasks" element={<Terminal />} />
            <Route path="*" element={<h1>Don't Fool Around</h1>} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
