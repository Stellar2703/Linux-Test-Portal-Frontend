import React, { useContext, useState } from "react";
import TerminalComponent from "../components/Terminal";
import "../Styles/Mainpage.css";
import Header from "../components/header";
import Footer from "../components/footer";
import TestCasesCard from "../components/output";
import { UserContext } from "../components/UserContext";

const Mainpage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { userData } = useContext(UserContext);

  // Extract tasks from userData and convert them into an array
  const taskArray = Object.entries(userData.tasks)
    .filter(([key]) => key.startsWith("task")) // Include only keys that start with "task"
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
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow flex">
        {/* Task Section */}
        <div className="flex-1 flex flex-col px-4 py-6 border-r border-gray-200">
          <div className="Task">
            <div className="flex justify-between items-center Task-Num bg-indigo-300 text-gray-800 font-semibold py-3 px-4 rounded-t-xl">
              <span>{taskArray[currentIndex].id.toUpperCase()}</span>
              <div className="flex space-x-2">
                <span className="bg-red-500 w-3 h-3 rounded-full"></span>
                <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
                <span className="bg-green-500 w-3 h-3 rounded-full"></span>
              </div>
            </div>
            <div className="Question bg-white p-4 rounded-b-xl text-gray-700">
              <p>{taskArray[currentIndex].description}</p>

              <div className="buttons flex justify-between mt-4">
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 rounded-lg ${currentIndex === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                  Previous
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={currentIndex === taskArray.length - 1}
                  className={`px-4 py-2 rounded-lg ${currentIndex === taskArray.length - 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Section */}
        <div className="flex-1 flex flex-col px-4 py-6">
          <TerminalComponent />
          <div className="mt-6">
            <TestCasesCard />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Mainpage;
