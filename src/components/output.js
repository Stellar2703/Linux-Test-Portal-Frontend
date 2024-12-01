// import React from 'react';

// const TestCasesCard = () => {
//     return (
//         <div className="mt-8 flex justify-center w-full">
//             {/* Card Container */}
//             <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full max-w-4xl">
//                 {/* Card Header */}
//                 <div className="flex justify-between items-center bg-gray-700 p-4 rounded-t-lg border-b border-gray-600">
//                     <h2 className="text-gray-200 font-semibold text-xl">
//                         Test Case Results
//                     </h2>
//                     <div className="flex space-x-2">
//                         <span className="bg-red-500 w-3 h-3 rounded-full"></span>
//                         <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
//                         <span className="bg-green-500 w-3 h-3 rounded-full"></span>
//                     </div>
//                 </div>

//                 {/* Test Case Output */}
//                 <div className="p-6 bg-gray-900 rounded-b-lg">
//                     <div className="space-y-4">
//                         {Array.from({ length: 10 }).map((_, idx) => (
//                             <div
//                                 key={idx}
//                                 className="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
//                             >
//                                 {/* Test Case Number */}
//                                 <div className="flex items-center space-x-3">
//                                     <span className="text-green-400 text-xl">✔</span>
//                                     <p className="font-mono text-gray-300">
//                                         Task {idx + 1}
//                                     </p>
//                                 </div>

//                                 {/* Status Message */}
//                                 <span className="text-sm text-green-400 font-medium">
//                                     Completed Successfully
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TestCasesCard;


import React, { useContext } from 'react';
import { UserContext } from "../components/UserContext";

const TestCasesCard = () => {
  const { taskData } = useContext(UserContext); // Access shared state

  return (
    <div className="mt-8 flex justify-center w-full">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full max-w-4xl">
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
            {taskData?.testCases?.length > 0 ? (
              taskData.testCases.map((testCase, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-xl ${testCase.isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                      {testCase.isSuccess ? '✔' : '✖'}
                    </span>
                    <p className="font-mono text-gray-300">{testCase.task}</p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      testCase.isSuccess ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {testCase.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No test case results available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCasesCard;
