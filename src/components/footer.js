import React from "react";
import {useNavigate} from "react-router-dom"

function Footer() {
  const navigate = useNavigate()

  const handleFinish = (e) =>{
    e.preventDefault()
    navigate('/finish')
  }

  return (
    <footer className="sticky bottom-0 py-4 px-8 bg-gray-900 text-gray-200 flex items-center justify-between border-t border-gray-700 shadow-lg">
      {/* Left Section */}
      <div>
        <button
        onClick={(e) => {handleFinish(e)}}
          type="button"
          className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 focus:outline-none transition-all duration-300"
        >
          Finish 
        </button>
      </div>

      {/* Center Section */}
      <div className="text-center ">
        <p className="text-sm font-semibold text-gray-400">
          Student ID: 
          <span className="text-gray-200"> 7376231CS345</span>
        </p>
      </div>

      <div className="w-24"></div>
    </footer>
  );
}

export default Footer;
