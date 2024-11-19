import React from "react";

function Footer() {
  return (
    <footer className="sticky bottom shadow-2xl py-7 px-8 bg-gray-300 text-white flex items-center justify-between">
    
      <div>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 focus:outline-none"
        >
          Finish
        </button>
      </div>

      <div className="text-center text-black font-semibold">
        Student ID: 7376231CS345
      </div>

      {/* Right Section: Skip and Submit Buttons */}
      <div className="flex items-center space-x-4">
        {/* <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-7 py-2.5 focus:outline-none"
        >
          Next
        </button> */}
      </div>
    </footer>
  );
}

export default Footer;

