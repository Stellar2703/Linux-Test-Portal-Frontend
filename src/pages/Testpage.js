// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       <h1>Task List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Level</th>
//             <th>Task 1</th>
//             <th>Task 2</th>
//             {/* Add more columns as needed */}
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map(task => (
//             <tr key={task.id}>
//               <td>{task.id}</td>
//               <td>{task.level}</td>
//               <td>{task.task1}</td>
//               <td>{task.task2}</td>
//               {/* Add more tasks */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskList;



import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [registerNumber, setRegisterNumber] = useState(1);
  const [response, setResponse] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/login', {
        register_number: registerNumber,
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Register Number"
        value={registerNumber}
        onChange={(e) => setRegisterNumber(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {response && (
        <div>
          <h3>Student Name: {response.student.name}</h3>
          <h4>Level: {response.student.level}</h4>
          <h4>IP: {response.system.ip}</h4>
          <h4>System User: {response.system.user.username}</h4>
          <h4>Password: {response.system.user.password}</h4>
          <h4>Tasks:</h4>
          <ul>
            {Object.entries(response.tasks).map(([key, value]) =>
              key.startsWith('task') ? <li key={key}>{value}</li> : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
