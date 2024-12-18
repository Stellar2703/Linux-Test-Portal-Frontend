// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { UserProvider } from './components/UserContext';
// import LoginPage from './pages/LoginPage';
// import Mainpage from './pages/Mainpage';
// import ThankYouPage from './pages/SubmitPage';
// import Dashboardhome from './pages/DashboardPage';
// import StudentPage from './pages/StudentPage';
// import ResultPage from './pages/ResultPage';
// import ReviewPage from './pages/ReviewPage';
// import Sidebar from './components/sidebar';

// function App() {
//   return (
//     <div className="App">
//       <UserProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<LoginPage />} />
//             <Route path="/main" element={<Mainpage />} />
//             <Route path="/submit" element={<ThankYouPage />} />
//             <Route path="/dashboard" element={<Dashboardhome />}>
//               <Route path="students" element={<StudentPage />} />
//               <Route path="result" element={<ResultPage />} />
//               <Route path="review" element={<ReviewPage />} />
//             </Route>
//             <Route path="*" element={<h1>Don't Fool Around</h1>} />
//           </Routes>
//         </Router>
//       </UserProvider>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import LoginPage from './pages/LoginPage';
import Mainpage from './pages/Mainpage';
import ThankYouPage from './pages/SubmitPage';
import Dashboardhome from './pages/DashboardPage';
import StudentPage from './pages/StudentPage';
import ResultPage from './pages/ResultPage';
import ReviewPage from './pages/ReviewPage';
import ProtectedRoute from './components/protectedroute';


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={!isSubmitted ? <ProtectedRoute element={<Mainpage setIsSubmitted={setIsSubmitted} />} /> : <Navigate to="/submit" />} />
            <Route path="/submit" element={isSubmitted ? <ThankYouPage /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboardhome />} />}>
              <Route path="students" element={<ProtectedRoute element={<StudentPage />} />} />
              <Route path="result" element={<ProtectedRoute element={<ResultPage />} />} />
              <Route path="review" element={<ProtectedRoute element={<ReviewPage />} />} />
            </Route>
            <Route path="*" element={<ProtectedRoute element={<h1> Don't Fool Around </h1>} />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;