import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import "../Styles/header.css";

function BookHeader() {
    return (
        <header className="sticky top-0 shadow-md py-0.5 px-2 bg-white">
            <nav className="flex items-center justify-between">

                <div className="logo">
                    <Link to="/">
                        <img src="src/assets/logo.svg" alt="Logo" />
                    </Link>
                </div>

                <div className="relative w-full max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-100 focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none rounded-full shadow-sm pl-10 pr-4 py-2"
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div>
                    <FaBell className="text-blue-700 mr-2 size-5 border-9 rounded-sm hover:ring-2 ring-gray-500" />
                </div>
            </nav>
        </header>
    );
}

export default BookHeader;

