

// import React, { useContext } from 'react';
// import { UserContext } from "../components/UserContext";

// const TestCasesCard = () => {
//   const { taskData } = useContext(UserContext); // Access shared state

//   return (
//     <div className="mt-8 flex justify-center w-full">
//       <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full max-w-4xl">
//         <div className="flex justify-between items-center bg-gray-700 p-4 rounded-t-lg border-b border-gray-600">
//           <h2 className="text-gray-200 font-semibold text-xl">Test Case Results</h2>
//           <div className="flex space-x-2">
//             <span className="bg-red-500 w-3 h-3 rounded-full"></span>
//             <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
//             <span className="bg-green-500 w-3 h-3 rounded-full"></span>
//           </div>
//         </div>

//         <div className="p-6 bg-gray-900 rounded-b-lg">
//           <div className="space-y-4">
//             {/* Test Cases */}
//             {taskData?.testCases?.length > 0 ? (
//               taskData.testCases.map((testCase, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <span className={`text-xl ${testCase.isSuccess ? 'text-green-400' : 'text-red-400'}`}>
//                       {testCase.isSuccess ? '✔' : '✖'}
//                     </span>
//                     <p className="font-mono text-gray-300">{testCase.task}</p>
//                   </div>
//                   <span
//                     className={`text-sm font-medium ${
//                       testCase.isSuccess ? 'text-green-400' : 'text-red-400'
//                     }`}
//                   >
//                     {testCase.status}
//                   </span>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400 text-center">No test case results available.</p>
//             )}

//             {/* Script Output */}
//             {taskData?.output && (
//               <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow">
//                 <h4 className="text-gray-300 font-semibold mb-2">Script Output:</h4>
//                 <pre className="bg-gray-900 text-gray-300 p-3 rounded-md">{taskData.output}</pre>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestCasesCard;
// import React, { useContext } from 'react';
// import { UserContext } from "../components/UserContext";

// const TestCasesCard = () => {
//   const { taskData } = useContext(UserContext); // Access shared state

//   return (
//     <div className="mt-8 flex justify-center w-full">
//       <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full max-w-4xl">
//         <div className="flex justify-between items-center bg-gray-700 p-4 rounded-t-lg border-b border-gray-600">
//           <h2 className="text-gray-200 font-semibold text-xl">Test Case Results</h2>
//           <div className="flex space-x-2">
//             <span className="bg-red-500 w-3 h-3 rounded-full"></span>
//             <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
//             <span className="bg-green-500 w-3 h-3 rounded-full"></span>
//           </div>
//         </div>

//         <div className="p-6 bg-gray-900 rounded-b-lg">
//           <div className="space-y-4">           

//             {/* Script Output */}
//             {taskData?.output && (
//               <div className="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm mb-2">
//                 <div className="flex items-center space-x-3">
//                   <span className="text-xl text-blue-400">
//                     {taskData?.output.includes("Failed") ? '✖' : '✔'}
//                   </span>
//                   <p className="font-mono text-gray-300">Script Output</p>
//                 </div>
//                 <span
//                   className={`text-sm font-medium ${
//                     taskData?.output.includes("Failed") ? 'text-red-400' : 'text-green-400'
//                   }`}
//                 >
//                   {taskData?.output.includes("Failed") ? 'Failed' : 'Completed Successfully'}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
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
            {/* Script Output */}
            {taskData?.output && (
              <div className="p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xl text-blue-400">
                    {taskData?.output.includes("Failed") ? '✖' : '✔'}
                  </span>
                  <p className="font-mono text-gray-300">Script Output</p>
                </div>
                <pre
                  className={`text-sm text-gray-300 mt-2 p-3 bg-gray-800 rounded-md ${
                    taskData?.output.includes("Failed") ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {taskData?.output}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCasesCard;
