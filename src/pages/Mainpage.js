
import React, { useContext, useState } from "react";
import TerminalComponent from "../components/Terminal";
import Header from "../components/header";
import Footer from "../components/footer";
import TestCasesCard from "../components/output";
import { UserContext } from "../components/UserContext";
import ExecuteScriptComponent from "./TaskStatus";

const Mainpage = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State for current task index
  const { userData } = useContext(UserContext);
  const { taskData } = useContext(UserContext);

  // Extract tasks from userData and convert them into an array
  const taskArray = Object.entries(userData.tasks || {})
    .filter(([key]) => key.startsWith("task"))
    .map(([key, value]) => ({
      id: key,
      description: value,
    }));

  // Handle Previous Button Click
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Handle Next Button Click
  const handleNext = () => {
    if (currentIndex < taskArray.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Pass Pagination-related props to Header */}
     <div className="sticky top-0 z-10">
      <Header
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        totalPages={taskArray.length}
      />
      </div>
      <div className="flex-grow flex">
        {/* Task Section */}
        <div className="overflow-auto flex-1 flex flex-col px-4 py-6 bg-gray-800 border-r border-gray-700">
          <div className="Task">
            <div className="flex justify-between items-center Task-Num bg-gray-700 text-gray-200 font-semibold py-3 px-4 rounded-t-lg">
              <span className="text-2xl font-bold">
                {taskArray[currentIndex]?.id.toUpperCase() || "No Task"}
              </span>
              <div className="flex space-x-2">
                <span className="bg-red-500 w-3 h-3 rounded-full"></span>
                <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
                <span className="bg-green-500 w-3 h-3 rounded-full"></span>
              </div>
            </div>
            <div className="Question bg-gray-700 p-4 rounded-b-lg text-gray-300 shadow">
              <p>{taskArray[currentIndex]?.description || "No description available"}</p>
                <div className="buttons flex justify-between mt-4">
              {/* Previous Button */}
                 <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 rounded-lg ${currentIndex === 0
                      ? "bg-gray-600 cursor-not-allowed text-gray-400"
                      : "bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    }`}
                >
                  Previous
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={currentIndex === taskArray.length - 1}
                  className={`px-4 py-2 rounded-lg ${currentIndex === taskArray.length - 1
                      ? "bg-gray-600 cursor-not-allowed text-gray-400"
                      : "bg-green-600 hover:bg-green-700 text-white font-medium"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <TestCasesCard />
          </div>
        </div>

        {/* Terminal Section */}
        <div className="flex-1 flex flex-col px-4 py-6 bg-gray-800">
          <TerminalComponent />
          <ExecuteScriptComponent/>
          </div>
      </div>

      <Footer />
    </div>
  );
};

export default Mainpage;
