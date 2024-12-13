import background from "../assets/background.jpg";
import logo from "../assets/bit_cloud_logo.png";
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (email) => {
    try {
      const response = await axios.post('http://10.30.10.22:4000/api/login', { register_number: email });
      console.log('Response Data:', response.data); // Debugging
      setUserData(response.data); // Save data in context
      navigate('/main'); // Navigate to Mainpage
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error fetching data');
    }
  };


  // if vijay harshan booking window is completed then we will use this for super admin login
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/login', { User_name: username, Password: password });
      console.log('Response Data:', response.data); // Debugging
      setUserData(response.data); // Save data in context
      // navigate('/main'); // Navigate to Mainpage
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error fetching data');
    }


  };

  return (
    <div class="flex flex-wrap">
      <div class="flex w-full flex-col md:w-1/2">
          
          <div class="lg:w-[30rem] mx-auto my-auto   flex flex-col justify-center pt-2 md:justify-start md:px-6 md:pt-0 ">
          <div className="lg:w-[28rem] mx-auto  flex flex-col justify-center  md:justify-start md:px-6 md:pt-0">
            {/* Top Image */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}// Replace with the image source or variable
                alt="Top Decoration"
                className="h-32 w-32 object-contain"
              />
            </div>
          </div>
            <p class="text-left text-3xl font-bold">Be Proud of How Hard You are Trying  </p>
            <p class="mt-2 text-left text-gray-500">Verify Yourself to DIVE IN,</p>
            <div class="flex flex-col pt-8   items-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const token = credentialResponse.credential; // Extract the token
                  if (token) {
                    const decoded = jwtDecode(token); // Decode the token
                    console.log('Decoded Token:', decoded);

                    // Extract email and use it as register_number
                    const email = decoded.email;
                    if (email) {
                      console.log('Sending email as register_number:', email);
                      handleSubmit(email); // Send email to API
                    } else {
                      console.error('Email not found in token');
                    }
                  } else {
                    console.log('No token received');
                  }
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
            {/* <div class="relative mt-8 flex h-px place-items-center bg-gray-200">
              <div class="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
            </div>
            <form class="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit1}>
              <div class="flex flex-col pt-4">
                <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} id="login-email" class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
                </div>
              </div>
              <div class="mb-12 flex flex-col pt-4">
                <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="login-password" class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" />
                </div>
              </div>
              <button type="submit" class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2">Log in</button>
            </form> */}
          </div>
        </div>
        <div class="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <img class="-z-1 absolute top-0 h-full w-full object-cover opacity-90" alt="" src={background} />
        </div>
      </div>
      );
}

      export default LoginPage;