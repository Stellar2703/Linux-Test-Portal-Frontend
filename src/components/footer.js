import React from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../components/UserContext";
import axios from 'axios';
import { useContext } from 'react';

const Footer = () => {
  const { userData } = useContext(UserContext);
  const { taskData } = useContext(UserContext);
  const navigate = useNavigate()
 
  const isAllTasksCompleted = (taskData) => {
    // Check if all tasks have isSuccess === true
    return taskData.testCases.every((task) => task.isSuccess) ? 1 : 0;
  };
  console.log("Status :",isAllTasksCompleted(taskData))
  const final_check= isAllTasksCompleted(taskData)+1
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:4000/api/logout', { level_user_id: userData.systemUser.id, complete:final_check,  reg_no:userData.student.register_number});
        // console.log('Response Data:', response.data); // Debugging
        navigate('/test'); // Navigate to Mainpage
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Error fetching data');
        navigate('/test'); // Navigate to Mainpage
    }
};
console.log('User Data:', userData.systemUser.id); // Debugging
console.log('complete:', final_check); // Debugging
console.log('reg_no:', userData.student.register_number); // Debugging
console.log('User Data:', userData.systemUser.id); // Debugging
  

    return (
      <footer className="sticky bottom-0 py-4 px-8 bg-gray-900 text-gray-200 flex items-center justify-between border-t border-gray-700 shadow-lg">
        {/* Left Section */}
        <div>
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 focus:outline-none transition-all duration-300"
          >
            Finish
          </button>
        </div>

        {/* Center Section */}
        <div className="text-center ">
          <p className="text-sm font-semibold text-gray-400">
            Student ID:
            <span className="text-gray-200"> 7376231CS345</span>
          </p>
        </div>

        <div className="w-24"></div>
      </footer>
    );
  }


export default Footer;
