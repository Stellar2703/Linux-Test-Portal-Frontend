// import React, { useState, useEffect, useCallback } from "react";
// import { FaStopwatch } from "react-icons/fa"; // Import FontAwesome stopwatch icon
// import { useNavigate } from "react-router-dom";

// function CountdownTimer({ targetDate , setIsSubmitted }) {
//   const navigate = useNavigate();

//   // Memoize the calculateTimeLeft function using useCallback
//   const calculateTimeLeft = useCallback(() => {
//     const now = new Date();
//     const difference = targetDate - now;

//     return {
//       hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
//       minutes: Math.max(Math.floor((difference / (1000 * 60)) % 60), 0),
//       seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
//     };
//   }, [targetDate]); // Only recreate the function when targetDate changes

//   // State to store the time left
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

//   useEffect(() => {
//     const timerId = setInterval(() => {
//       setTimeLeft(calculateTimeLeft()); // Update time left every second
//     }, 1000);

//     return () => clearInterval(timerId); // Cleanup interval on component unmount
//   }, [calculateTimeLeft]); // Now calculateTimeLeft is stable and won't change on every render

//   useEffect(() => {
//     if (!(timeLeft.hours || timeLeft.minutes || timeLeft.seconds)) {
//       setIsSubmitted(true);
//       navigate('/submit'); // Redirect when time is up
//     }
//   }, [timeLeft, navigate]); // Add navigate to dependencies

//   // Function to pad time to 2 digits (e.g., "01" instead of "1")
//   const padTime = (time) => (time < 10 ? `0${time}` : time);

//   return (
//     <div className="flex items-center bg-gray-100 text-black px-3 py-1.5 rounded-md space-x-6">
//       {/* Icon */}
//       <div className="text-blue-800 text-2xl">
//         <FaStopwatch />
//       </div>

//       {/* "Time Left" Label */}
//       <div className="text-gray-800">Time Left:</div>

//       {/* Time and Labels */}
//       <div className="flex flex-col items-center">
//         {/* Time */}
//         <div className="flex text-lg font-mono font-semibold space-x-2">
//           <span>{padTime(timeLeft.hours)}</span>:
//           <span>{padTime(timeLeft.minutes)}</span>:
//           <span>{padTime(timeLeft.seconds)}</span>
//         </div>
//         {/* Labels */}
//         <div className="text-xs text-gray-900 flex space-x-4">
//           <span>Hrs</span>
//           <span>Min</span>
//           <span>Sec</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CountdownTimer;


import React, { useState, useEffect, useCallback,useContext } from "react";
import { FaStopwatch } from "react-icons/fa"; // Import FontAwesome stopwatch icon
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

function CountdownTimer({ targetDate, setIsSubmitted}) {
  const navigate = useNavigate();

  const { userData,taskData } = useContext(UserContext); // Destructuring both from UserContext
  // Memoize the calculateTimeLeft function using useCallback
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = targetDate - now;

    
    return {
      hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((difference / (1000 * 60)) % 60), 0),
      seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
    };
  }, [targetDate]); // Only recreate the function when targetDate changes

  // State to store the time left
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft()); // Update time left every second
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, [calculateTimeLeft]); // Now calculateTimeLeft is stable and won't change on every render

  useEffect(() => {
    const isAllTasksCompleted = (data) => {
      if (!data || !data.testCases) return 0; // Return 0 if taskData or testCases is not available
      return data.testCases.every((task) => task.isSuccess) ? 1 : 0;
    };

    const final_check = isAllTasksCompleted(taskData); // Calculate the status for all tasks

    if (!(timeLeft.hours || timeLeft.minutes || timeLeft.seconds)) {
      const submitData = async () => {
        try {
          await axios.post("http://10.30.10.22:4000/api/logout", {
            level_user_id: userData?.systemUser?.id,
            complete: final_check,
            reg_no: userData?.student?.register_number,
          });
          setIsSubmitted(true);
          navigate("/submit"); // Navigate to another page
        } catch (error) {
          console.error(error);
          alert(error.response?.data?.message || "Error fetching data");
          navigate("/test"); // Navigate even if there's an error
        }
      };

      submitData(); // Call the async function to submit data
    }
  }, [timeLeft, navigate,  setIsSubmitted,taskData,userData?.systemUser?.id,userData?.student?.register_number ]); // Add dependencies for proper reactivity

  // Function to pad time to 2 digits (e.g., "01" instead of "1")
  const padTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="flex items-center bg-gray-100 text-black px-3 py-1.5 rounded-md space-x-6">
      {/* Icon */}
      <div className="text-blue-800 text-2xl">
        <FaStopwatch />
      </div>

      {/* "Time Left" Label */}
      <div className="text-gray-800">Time Left:</div>

      {/* Time and Labels */}
      <div className="flex flex-col items-center">
        {/* Time */}
        <div className="flex text-lg font-mono font-semibold space-x-2">
          <span>{padTime(timeLeft.hours)}</span>:
          <span>{padTime(timeLeft.minutes)}</span>:
          <span>{padTime(timeLeft.seconds)}</span>
        </div>
        {/* Labels */}
        <div className="text-xs text-gray-900 flex space-x-4">
          <span>Hrs</span>
          <span>Min</span>
          <span>Sec</span>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
