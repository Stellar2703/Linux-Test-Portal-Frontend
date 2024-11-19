import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CountdownTimer from "./timmer";
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

function Header() {
  const [activePage, setActivePage] = useState(1);
  const targetDate = new Date("2024-12-31T23:59:59");
  const { userData } = useContext(UserContext);
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <header className="sticky top-0 shadow-md py-4 px-5 bg-white z-10">
      <nav aria-label="Page navigation" className="flex items-center justify-between">
        {/* Placeholder div to balance layout */}
        <div className="w-1/3"></div>

        {/* Centered Pagination */}
        <div className="flex justify-center flex-grow">
         <h1>{userData.student.name}</h1>
         <h1>{userData.student.level}</h1>
         <h1>{userData.student.register_number}</h1>
          <ul className="flex items-center space-x-2">
            {/* Previous Button */}
            <li>
              <button
                onClick={() => handlePageClick(activePage > 1 ? activePage - 1 : 1)}
                className="flex items-center justify-center px-3 h-9 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                aria-label="Previous"
              >
                <FaChevronLeft />
              </button>
            </li>

            {/* Page Numbers */}
            {[1, 2, 3, 4, 5, 6, 7].map((number) => (
              <li key={number}>
                <button
                  onClick={() => handlePageClick(number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    activePage === number
                      ? "text-white bg-blue-600 shadow-md hover:bg-blue-700"
                      : "text-gray-500 bg-gray-200 hover:bg-gray-200"
                  }`}
                  aria-current={activePage === number ? "page" : undefined}
                >
                  {number}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li>
              <button
                onClick={() => handlePageClick(activePage < 7 ? activePage + 1 : 7)}
                className="flex items-center justify-center px-3 h-9 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                aria-label="Next"
              >
                <FaChevronRight />
              </button>
            </li>
          </ul>
        </div>

        {/* Countdown Timer on the Right */}
        <div className="w-1/3 flex justify-end">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
