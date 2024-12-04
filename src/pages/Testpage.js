       import React, { useState, useContext } from 'react';
    import axios from 'axios';
    import { UserContext } from '../components/UserContext';
    import { useNavigate } from 'react-router-dom';

    const Test = () => {
        const [registerNumber, setRegisterNumber] = useState('REG001');
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
