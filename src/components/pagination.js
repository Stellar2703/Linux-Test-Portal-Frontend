
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({ totalPages, activePage, onPageChange }) {
  // Generate an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <header className="sticky top-0 shadow-md py-3 px-4 bg-gray-900">
      {/* Pagination Navigation */}
      <nav
        aria-label="Page navigation example"
        className="flex flex-col items-center justify-center"
      >
        <ul className="flex items-center space-x-2 h-9 text-sm">
          {/* Previous Button */}
          <li>
            <button
              href="#"
              onClick={() => onPageChange(Math.max(activePage - 1, 1))}
              className={`flex items-center justify-center px-3 h-9 text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 ${
                activePage === 1 && "cursor-not-allowed opacity-50"
              }`}
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
          </li>

          {/* Page Numbers */}
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                href="#"
                onClick={() => onPageChange(number)}
                className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                  activePage === number
                    ? "text-white bg-blue-600 hover:bg-blue-700"
                    : "text-gray-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
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
              href="#"
              onClick={() => onPageChange(Math.min(activePage + 1, totalPages))}
              className={`flex items-center justify-center px-3 h-9 text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 ${
                activePage === totalPages && "cursor-not-allowed opacity-50"
              }`}
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Pagination;
