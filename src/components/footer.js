import React from "react";

function Footer() {
  return (
    <footer className="sticky bottom-0 py-6 px-8 bg-gray-800 text-gray-200 flex items-center justify-between border-t border-gray-700">
      {/* Left Section: Finish Button */}
      <div>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-6 py-2 shadow-md"
        >
          Finish
        </button>
      </div>

      {/* Center Section: Student Info */}
      <div className="text-center text-gray-400 font-medium">
        Student ID: 7376231CS345
      </div>

      {/* Right Section: Placeholder Buttons */}
      {/* <div className="flex items-center space-x-4">
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-6 py-2 shadow-md"
        >
          Skip
        </button>
      </div> */}
    </footer>
  );
}

export default Footer;
