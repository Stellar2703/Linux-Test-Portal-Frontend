
import React, { useContext } from 'react';
import { UserContext } from "../components/UserContext";


const TestCasesCard = () => {
  const { taskData } = useContext(UserContext);

  return (
    <div className="mt-8 flex justify-center w-full">
      <div className="bg-gray-800  rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center bg-gray-700 p-4 rounded-t-lg border-b border-gray-600">
          <h2 className="text-gray-200 font-semibold text-xl">Test Case Results</h2>
          <div className="flex space-x-2">
            <span className="bg-red-500 w-3 h-3 rounded-full"></span>
            <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
            <span className="bg-green-500 w-3 h-3 rounded-full"></span>
          </div>
        </div>

        <div className="p-6 bg-gray-900 rounded-b-lg">
          <div className="space-y-4">
            {taskData?.testCases?.map((testCase, index) => (
              <div
                key={index}
                className={`p-3 border rounded-lg shadow-sm flex items-center space-x-3 ${
                  testCase.isSuccess
                    ? 'bg-green-900 border-green-700'
                    : 'bg-red-900 border-red-700'
                }`}
              >
                <span className={`text-xl ${testCase.isSuccess ? 'text-green-400' : 'text-red-200'}`}>
                  {testCase.isSuccess ? '✔' : '✖'}
                </span>
                <p className="font-medium text-gray-200">{testCase.task}</p>
                <span
                  className={`text-sm font-semibold ml-auto ${
                    testCase.isSuccess ? 'text-green-300' : 'text-red-300'
                  }`}
                >
                  {testCase.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default TestCasesCard;
