// import React, { useState } from 'react';
// import axios from 'axios';

// const Test = () => {
//     const [registerNumber, setRegisterNumber] = useState('');
//     const [userData, setUserData] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:4000/api/login', { register_number: registerNumber });
//             setUserData(response.data);
//         } catch (error) {
//             console.error(error);
//             alert(error.response?.data?.message || 'Error fetching data');
//         }
//     };

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <h1>Linux Test Portal</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Enter Register Number"
//                     value={registerNumber}
//                     onChange={(e) => setRegisterNumber(e.target.value)}
//                     required
//                     style={{ padding: '10px', marginRight: '10px' }}
//                 />
//                 <button type="submit" style={{ padding: '10px' }}>Submit</button>
//             </form>

//             {userData && (
//                 <div style={{ marginTop: '20px' }}>
//                     <h3>Student Details</h3>
//                     <p>Name: {userData.student.name}</p>
//                     <p>Register Number: {userData.student.register_number}</p>
//                     <p>Level: {userData.student.level}</p>
//                     <p>IP: {userData.ip}</p>

//                     <h3>System Details</h3>
//                     <p>Username: {userData.systemUser.username}</p>
//                     <p>Password: {userData.systemUser.password}</p>

//                     <h3>Tasks</h3>
//                     <ul>
//                         {Object.entries(userData.tasks).map(([key, value]) => (
//                             key.startsWith('task') && value && <li key={key}>{value}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Test;
    import React, { useState, useContext } from 'react';
    import axios from 'axios';
    import { UserContext } from '../components/UserContext';
    import { useNavigate } from 'react-router-dom';

    const Test = () => {
        const [registerNumber, setRegisterNumber] = useState('');
        const { setUserData } = useContext(UserContext);
        const navigate = useNavigate();     

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:4000/api/login', { register_number: registerNumber });
                console.log('Response Data:', response.data); // Debugging
                setUserData(response.data); // Save data in context
                navigate('/main'); // Navigate to Mainpage
            } catch (error) {
                console.error(error);
                alert(error.response?.data?.message || 'Error fetching data');
            }
        };
        

        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Linux Test Portal</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Register Number"
                        value={registerNumber}
                        onChange={(e) => setRegisterNumber(e.target.value)}
                        required
                        style={{ padding: '10px', marginRight: '10px' }}
                    />
                    <button type="submit" style={{ padding: '10px' }}>Submit</button>
                </form>
            </div>
        );
    };

    export default Test;
