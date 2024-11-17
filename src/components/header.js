import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CountdownTimer from "./timmer";

function Header() {
  const [activePage, setActivePage] = useState(1);
  const targetDate = new Date('2024-12-31T23:59:59');

  // Handler for clicking a page number
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <header className="sticky top-0 shadow-md py-6 px-5 bg-white">
      {/* Container for Timer and Pagination */}
      <nav
        aria-label="Page navigation example"
        className="flex items-center justify-between"
      >
        {/* Flex Container to Center Pagination */}
        <div className="flex items-center justify-center flex-grow">
          <ul className="flex items-center space-x-3 h-9 text-sm">
            {/* Previous Button */}
            <li>
              <a
                href="#"
                onClick={() => handlePageClick(activePage > 1 ? activePage - 1 : 1)}
                className="flex items-center justify-center px-3 h-9 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                aria-label="Previous"
              >
                <FaChevronLeft />
              </a>
            </li>

            {/* Page Numbers */}
            {[1, 2, 3, 4, 5, 6, 7].map((number) => (
              <li key={number}>
                <a
                  href="#"
                  onClick={() => handlePageClick(number)}
                  className={`flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-300 ease-in-out ${
                    activePage === number
                      ? "text-white bg-blue-600 shadow-md hover:bg-blue-700"
                      : "text-gray-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-300 dark:text-black dark:hover:bg-gray-400"
                  }`}
                  aria-current={activePage === number ? "page" : undefined}
                >
                  {number}
                </a>
              </li>
            ))}

            {/* Next Button */}
            <li>
              <a
                href="#"
                onClick={() => handlePageClick(activePage < 7 ? activePage + 1 : 7)}
                className="flex items-center justify-center px-3 h-9 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                aria-label="Next"
              >
                <FaChevronRight />
              </a>
            </li>
          </ul>
        </div>

        {/* Countdown Timer on the Right */}
        <div className="ml-6">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
