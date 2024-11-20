// import React from "react";
// import CountdownTimer from "./timmer";
// import { useContext } from "react";
// import { UserContext } from "../components/UserContext";

// function Header() {
//   const targetDate = new Date("2024-12-31T23:59:59");
//   const { userData } = useContext(UserContext);

//   return (
//     <header className="top-0 shadow-md px-5 bg-white z-10 w-full">
//       <nav
//         aria-label="Page navigation"
//         className="flex items-center justify-between"
//       >
//         {/* Left: Student Details */}
//         <div className="flex flex-col text-left space-y-1">
//           <h1 className="font-medium text-gray-800">{userData.student.name}</h1>
//           <h3 className="text-sm text-gray-500">
//             Reg. No: {userData.student.register_number}
//           </h3>
//         </div>


//         {/* Right: Countdown Timer */}
//         <div className="text-right">
//           <CountdownTimer targetDate={targetDate} />
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;


import React from "react";
import CountdownTimer from "./timmer";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

function Header() {
  const targetDate = new Date("2024-12-31T23:59:59");
  const { userData } = useContext(UserContext);

  return (
    <header className="top-0 shadow-md px-6 py-4 bg-gray-900 z-10 w-full">
      <nav
        aria-label="Page navigation"
        className="flex items-center justify-between"
      >
        {/* Left: Student Details */}
        <div className="flex flex-col text-left space-y-2">
          <h1 className="text-xl font-bold text-gray-200">
            {userData.student.name}
          </h1>
          <h3 className="text-sm font-medium text-gray-400">
            Reg. No:{" "}
            <span className="text-gray-300">
              {userData.student.register_number}
            </span>
          </h3>
        </div>

        {/* Right: Countdown Timer */}
        <div className="text-right bg-gray-800 text-gray-200 font-medium px-3 py-2 rounded-lg shadow-md">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
