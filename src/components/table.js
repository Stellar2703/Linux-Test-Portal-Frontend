import React from 'react';

function Table({ }) { 
    
    const products = [
        { name: "SF seminar-hall 1", location: "Sunflower-block", date_time: "10-10-2024", capacity: "300",staff:"Arvindh" },
        { name: "SF seminar-hall 1", location: "Sunflower-block", date_time: "10-10-2024", capacity: "300",staff:"Arvindh" },
        { name: "SF seminar-hall 1", location: "Sunflower-block", date_time: "10-10-2024", capacity: "300",staff:"Arvindh" },
        { name: "SF seminar-hall 1", location: "Sunflower-block", date_time: "10-10-2024", capacity: "300",staff:"Arvindh" },
        { name: "SF seminar-hall 1", location: "Sunflower-block", date_time: "10-10-2024", capacity: "300",staff:"Arvindh" }
    ]

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all" className="sr-only">Select all</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">Venue name</th>
                        <th scope="col" className="px-6 py-3">location</th>
                        <th scope="col" className="px-6 py-3">Date-Time</th>
                        <th scope="col" className="px-6 py-3">Capacity</th>
                        <th scope="col" className="px-6 py-3">Staff</th>
                        <th scope="col" className="px-6 py-3">status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-${index + 1}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor={`checkbox-table-${index + 1}`} className="sr-only">Select {product.name}</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">{product.location}</td>
                                <td className="px-6 py-4">{product.date_time}</td>
                                <td className="px-6 py-4">{product.capacity}</td>
                                <td className="px-6 py-4">{product.staff}</td>
                                <td className="px-6 py-4">
                                <span class="inline-flex items-center bg-green-400 text-white text-xs font-medium px-2 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                <span > Booked</span></span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                No products available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;