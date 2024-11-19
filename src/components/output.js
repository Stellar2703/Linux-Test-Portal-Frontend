// import React from 'react';

// const TestCasesCard = () => {
//     return (
//         <div className="mt-8 flex justify-center w-full">
//             {/* Card Container */}
//             <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-4xl">
//                 {/* Card Header */}
//                 <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg border-b border-gray-300">
//                     <h2 className="text-gray-700 font-semibold text-xl">Test Case Results</h2>
//                     <div className="flex space-x-2">
//                         <span className="bg-red-500 w-3 h-3 rounded-full"></span>
//                         <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
//                         <span className="bg-green-500 w-3 h-3 rounded-full"></span>
//                     </div>
//                 </div>
        
//                 {/* Test Case Output */}
//                 <div className="p-6 bg-gray-50 rounded-b-lg">
//                     <div className="space-y-4">
//                         {Array.from({ length: 10 }).map((_, idx) => (
//                             <div
//                                 key={idx}
//                                 className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
//                             >
//                                 {/* Test Case Number */}
//                                 <div className="flex items-center space-x-3">
//                                     <span className="text-green-500 text-xl">✔</span>
//                                     <p className="font-mono text-gray-800">
//                                         Task {idx + 1}
//                                     </p>
//                                 </div>

//                                 {/* Status Message */}
//                                 <span className="text-sm text-green-600 font-medium">
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

import React from 'react';

const TestCasesCard = () => {
    return (
        <div className="mt-8 flex justify-center w-full">
            {/* Card Container */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full max-w-4xl">
                {/* Card Header */}
                <div className="flex justify-between items-center bg-gray-700 p-4 rounded-t-lg border-b border-gray-600">
                    <h2 className="text-gray-200 font-semibold text-xl">
                        Test Case Results
                    </h2>
                    <div className="flex space-x-2">
                        <span className="bg-red-500 w-3 h-3 rounded-full"></span>
                        <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
                        <span className="bg-green-500 w-3 h-3 rounded-full"></span>
                    </div>
                </div>

                {/* Test Case Output */}
                <div className="p-6 bg-gray-900 rounded-b-lg">
                    <div className="space-y-4">
                        {Array.from({ length: 10 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
                            >
                                {/* Test Case Number */}
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-400 text-xl">✔</span>
                                    <p className="font-mono text-gray-300">
                                        Task {idx + 1}
                                    </p>
                                </div>

                                {/* Status Message */}
                                <span className="text-sm text-green-400 font-medium">
                                    Completed Successfully
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
