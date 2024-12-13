import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Table from "../components/table";
import { FaUser, FaMapMarkerAlt, FaClipboardCheck, FaTimesCircle } from "react-icons/fa";
import Usage from '../components/usage';
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboardhome() {
    const [chord, setChord] = useState({
        Total_students: 0,
        Cleared_today: 0,
        Benchmark: 0,
        Failed_today: 0,
    });

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/dashboard/main');
                console.log('Response Data:', response.data); // Debugging
                setChord(response.data); // Update state with response data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once

    const cardData = [
        { title: "Total Students Today", value: chord.Total_students, icon: <FaUser className="text-purple-500" /> },
        { title: "Cleared Today", value: chord.Cleared_today, icon: <FaMapMarkerAlt className="text-yellow-400" /> },
        { title: "80% Benchmark", value: chord.Benchmark, icon: <FaClipboardCheck className="text-green-500" /> },
        { title: "Failed Today", value: chord.Failed_today, icon: <FaTimesCircle className="text-red-500" /> },
    ];

    return (
        <div className="dashboard flex bg-gray-100 min-h-screen">
            <div>
                <Sidebar />
            </div>
            <div className="flex flex-col p-6 w-full lg:w-4/5">
                <h2 className="text-3xl font-bold text-gray-700 mb-8">Dashboard</h2>

                {/* Card Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {cardData.map((card, index) => (
                        <div key={index} className="card bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl p-4 flex items-center">
                            <div className="icon-container p-4 bg-gray-200 rounded-xl text-3xl text-center mr-4 transition-transform transform hover:scale-110">
                                {card.icon}
                            </div>
                            <div className="text-container">
                                <h3 className="text-sm font-semibold text-gray-700">{card.title}</h3>
                                <p className="text-xl font-bold text-gray-900">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Usage Details Section */}
                <div>
                    {/* <Link to={"/analytics"}> */}
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 hover:text-indigo-600 transition-colors">Usage details</h3>
                        <Usage />
                    {/* </Link> */}
                </div>

                {/* Table Section */}
                {/* <div className="py-8">
                    <Table />
                </div> */}
            </div>
        </div>
    );
}

export default Dashboardhome;
