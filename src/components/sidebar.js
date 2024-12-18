import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserFriends, FaBook, FaCheckCircle, FaHistory, FaMoon, FaPowerOff } from "react-icons/fa";

const Sidebar = () => {
    const location = useLocation(); // To get the current URL path
    const [active, setActive] = useState(location.pathname);

    // Update active state when location changes
    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    const menuitems = [
        { name: 'Dashboard', icon: <FaUserFriends />, route: "/dashboard" },
        { name: 'Results', icon: <FaBook />, route: "/dashboard/result" },
        { name: 'Students', icon: <FaUserFriends />, route: "/dashboard/students" },
        { name: 'Review', icon: <FaCheckCircle />, route: "/dashboard/review" },
        { name: 'Settings', icon: <FaHistory />, route: "/settings" },
    ];

    return (
        <div className="w-64 h-screen bg-white p-4 flex flex-col justify-between shadow-md">
            <div className="flex-grow">
                <nav>
                    <ul className="space-y-2">
                        {menuitems.map((item) => (
                            <li key={item.name} className="cursor-pointer">
                                <Link
                                    to={item.route}
                                    className={`flex items-center space-x-3 p-4 rounded-lg transition duration-200
                                        ${active === item.route ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}
                                        hover:bg-blue-600 hover:text-white`}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="pt-14">
                <ul className="space-y-2">
                    <li className="flex items-center space-x-3 p-4 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-600 hover:text-white transition duration-200">
                        <FaMoon />
                        <span className="font-medium">Dark Mode</span>
                    </li>
                    <li key="logout">
                        <Link to="/" className="flex items-center space-x-3 p-4 rounded-lg text-gray-700 hover:bg-blue-600 hover:text-white transition duration-200">
                            <FaPowerOff />
                            <span className="font-medium">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;