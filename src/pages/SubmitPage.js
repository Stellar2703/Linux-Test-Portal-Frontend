import React from "react";
import { UserContext } from "../components/UserContext";
import { useContext } from "react";

const ThankYouPage = () => {
    const { userData, taskData } = useContext(UserContext);
    const isAllTasksCompleted = (data) => {
        if (!data || !data.testCases) return 0; // Return 0 if taskData or testCases is not available
        return data.testCases.every((task) => task.isSuccess) ? 1 : 0;
      };
      const resultStatus   = isAllTasksCompleted(taskData);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-800">
      <div className="text-center text-white p-8 rounded-lg shadow-2xl bg-opacity-90 bg-gray-900">
        <h1 className="text-4xl font-extrabold mb-4 animate-bounce">
          Thank You!
        </h1>
        <p className="text-lg font-medium mb-6 animate-fade-in">
          We appreciate you for attempting the test. Your efforts matter!
        </p>

        {/* Conditional rendering for pass/fail messages */}
        {resultStatus === 1 ? (
          <div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-lg">
              You have successfully cleared this level. Keep up the great work!
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">Don't Give Up!</h2>
            <p className="text-lg">
              You didn’t pass this time, but every attempt makes you stronger.
              Keep trying, and you'll get there!
            </p>
          </div>
        )}

        {/* Button to navigate */}
      </div>
    </div>
  );
};

export default ThankYouPage;
