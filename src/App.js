import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Mainpage from './pages/Mainpage';
import BookingPage from './pages/BookingPage';
import Test from './pages/Testpage';
import { UserProvider } from './components/UserContext';


function App() {
  return (
    <div className="App">
   <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<Mainpage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/test" element={<Test/>} />
        <Route path="*" element={<h1>Dont Fool Around </h1>}/>
      </Routes>
    </Router>
    </UserProvider>
    </div>

  );
}

export default App;
