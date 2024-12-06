import background from "../assets/background.jpg";  
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';  

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();     

  const handleSubmit = async (email) => {
    try {
      const response = await axios.post('http://localhost:4000/api/login', { register_number: email });
      console.log('Response Data:', response.data); // Debugging
      setUserData(response.data); // Save data in context
      navigate('/main'); // Navigate to Mainpage
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error fetching data');
    }
  };

  const handleSubmit1 = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:4000/api/login', { User_name: username , Password: password });  
          console.log('Response Data:', response.data); // Debugging
          setUserData(response.data); // Save data in context
          navigate('/main'); // Navigate to Mainpage
      } catch (error) {
          console.error(error);
          alert(error.response?.data?.message || 'Error fetching data');
      }
  };
  
    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          const accessToken = tokenResponse.access_token; // Get the access token
          if (accessToken) {
            const decodedToken = jwtDecode(accessToken); // Decode the token
            console.log('Decoded Token:', decodedToken);
          } else {
            console.error('No access token received');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      },
      onError: (error) => {
        console.error('Login Failed:', error);
      },
      scope: 'openid email profile',
    });
  
return(
<div class="flex flex-wrap">
  <div class="flex w-full flex-col md:w-1/2">
       <div class="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
      <p class="text-left text-3xl font-bold">Welcome back Student</p>
      <p class="mt-2 text-left text-gray-500">Verify Yourself to DIVE IN,</p>
     
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



      <button onClick={() => login()} class= "-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"><img class="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="" /> Log in with Google</button>
      <div class="relative mt-8 flex h-px place-items-center bg-gray-200">
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
      </form>
    </div>
  </div>
  <div class="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
    <img class="-z-1 absolute top-0 h-full w-full object-cover opacity-90" alt="" src={background} />
  </div>
</div>
);
}

export default LoginPage;