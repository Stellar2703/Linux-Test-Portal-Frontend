import React, { useContext } from "react";
import CountdownTimer from "./Timer";
import Pagination from "./pagination";
import { UserContext } from "./UserContext";

function Header({ currentIndex, setCurrentIndex, totalPages }) {
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 1)
  const { userData } = useContext(UserContext);

  // Handle Page Change from Pagination
  const handlePageChange = (pageNumber) => {
    setCurrentIndex(pageNumber - 1); // Convert 1-based index to 0-based
  };

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

        {/* Center: Pagination */}
        <div className="flex items-center justify-center flex-grow md:flex-none">
          <Pagination
            totalPages={totalPages}
            activePage={currentIndex + 1}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Right: Countdown Timer */}
        <div className="text-right bg-gray-800 text-gray-200 font-medium px-3 rounded-lg shadow-md">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
