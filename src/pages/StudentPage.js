
import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { FaSearch } from "react-icons/fa";
// import 

function StudentPage() {
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [selectedItems, setSelectedItems] = useState([]); // State for selected checkboxes

    const products = [
        { id: 1, name: "Ananya Sharma", department: "Admin", email: "ananya.sharma@example.com", contact: "+91 9876543210" },
        { id: 2, name: "Ravi Kumar", department: "IT", email: "ravi.kumar@example.com", contact: "+91 9876543220" },
        { id: 3, name: "Priya Verma", department: "HR", email: "priya.verma@example.com", contact: "+91 9876543230" },
        { id: 4, name: "Harish Patel", department: "Operations", email: "harish.patel@example.com", contact: "+91 9876543240" },
        { id: 5, name: "Meera Singh", department: "Support", email: "meera.singh@example.com", contact: "+91 9876543250" },
        { id: 6, name: "Arvindh Reddy", department: "Facilities", email: "arvindh.reddy@example.com", contact: "+91 9876543260" },
        { id: 7, name: "Simran Kapoor", department: "Marketing", email: "simran.kapoor@example.com", contact: "+91 9876543270" },
        { id: 8, name: "Vikram Das", department: "Security", email: "vikram.das@example.com", contact: "+91 9876543280" },
        { id: 9, name: "Nisha Mehta", department: "Catering", email: "nisha.mehta@example.com", contact: "+91 9876543290" },
        { id: 10, name: "Sandeep Joshi", department: "Facilities", email: "sandeep.joshi@example.com", contact: "+91 9876543300" }
    ];

    // Filter products based on the search query
    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.contact.includes(searchQuery)
        );
    });

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(products.map(product => product.id)); // Select all
        } else {
            setSelectedItems([]); // Deselect all
        }
    };

    const handleCheckboxChange = (e, id) => {
        if (e.target.checked) {
            setSelectedItems(prev => [...prev, id]); // Add to selectedItems
        } else {
            setSelectedItems(prev => prev.filter(itemId => itemId !== id)); // Remove from selectedItems
        }
    };

    return (
        <div className="dashboard flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex flex-col p-4 w-full lg:w-4/5">
                <h2 className="text-3xl font-bold text-gray-700 mb-8">Student details</h2>

                {/* Search bar */}
                <div className="flex justify-start p-4">
                    <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-sm px-1.5 py-1">
                        <FaSearch className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery} // Bind the search query
                            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
                            className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="shadow-md overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    {/* <div className="flex items-center">
                                        <input
                                            id="checkbox-all"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            checked={selectedItems.length === filteredProducts.length} // Check if all are selected
                                            onChange={handleSelectAll}
                                        />
                                        <label htmlFor="checkbox-all" className="sr-only">Select all</label>
                                    </div> */}
                                </th>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Staff Name</th>
                                <th scope="col" className="px-6 py-3">Department</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            {/* <div className="flex items-center">
                                                <input
                                                    id={`checkbox-table-${index + 1}`}
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    checked={selectedItems.includes(product.id)} // Check if the current product is selected
                                                    onChange={(e) => handleCheckboxChange(e, product.id)}
                                                />
                                                <label htmlFor={`checkbox-table-${index + 1}`} className="sr-only">Select {product.name}</label>
                                            </div> */}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.id}
                                        </th>
                                        <td className="px-6 py-4">{product.name}</td>
                                        <td className="px-6 py-4">{product.department}</td>
                                        <td className="px-6 py-4">{product.email}</td>
                                        <td className="px-6 py-4">{product.contact}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        No staff available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudentPage;
