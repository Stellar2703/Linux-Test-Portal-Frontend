// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./UserContext";
// import axios from "axios";
// import { useContext } from "react";

// const Footer = () => {
//   const { userData, taskData } = useContext(UserContext); // Destructuring both from UserContext
//   const navigate = useNavigate();

//   // Check if all tasks are completed
//   const isAllTasksCompleted = (data) => {
//     if (!data || !data.testCases) return 0; // Return 0 if taskData or testCases is not available
//     return data.testCases.every((task) => task.isSuccess) ? 1 : 0;
//   };

//   const final_check = isAllTasksCompleted(taskData); // Calculate the status for all tasks

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:4000/api/logout", {
//         level_user_id: userData?.systemUser?.id,
//         complete: final_check,
//         reg_no: userData?.student?.register_number,
//       });

//       navigate("/test"); // Navigate to another page
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Error fetching data");
//       navigate("/test"); // Navigate even if there's an error
//     }
//   };

//   return (
//     <footer className="sticky bottom-0 py-4 px-8 bg-gray-900 text-gray-200 flex items-center justify-between border-t border-gray-700 shadow-lg">
//       {/* Left Section */}
//       <div>
//         <button
//           onClick={handleSubmit}
//           type="button"
//           className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 focus:outline-none transition-all duration-300"
//         >
//           Finish
//         </button>
//       </div>

//       {/* Center Section */}
//       <div className="text-center">
//         <p className="text-sm font-semibold text-gray-400">
//           Student ID:
//           <span className="text-gray-200"> {userData?.student?.register_number || "N/A"}</span>
//         </p>
//       </div>

//       {/* Placeholder for Right Section */}
//       <div className="w-24"></div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import { useContext } from "react";

const Footer = () => {
  const { userData, taskData } = useContext(UserContext); // Destructuring both from UserContext
  const navigate = useNavigate();

  // Check if all tasks are completed
  const isAllTasksCompleted = (data) => {
    if (!data || !data.testCases) return 0; // Return 0 if taskData or testCases is not available
    return data.testCases.every((task) => task.isSuccess) ? 1 : 0;
  };

  const final_check = isAllTasksCompleted(taskData); // Calculate the status for all tasks

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = window.confirm(
      "Are you sure you want to finish? This action cannot be undone."
    );

    if (!confirm) return; // Cancel the action if the user clicks "Cancel"

    try {
      await axios.post("http://localhost:4000/api/logout", {
        level_user_id: userData?.systemUser?.id,
        complete: final_check,
        reg_no: userData?.student?.register_number,
      });

      navigate("/submit"); // Navigate to another page
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error fetching data");
      navigate("/test"); // Navigate even if there's an error
    }
  };

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
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-400">
          Student ID:
          <span className="text-gray-200"> {userData?.student?.register_number || "N/A"}</span>
        </p>
      </div>

      {/* Placeholder for Right Section */}
      <div className="w-24"></div>
    </footer>
  );
};

export default Footer;
