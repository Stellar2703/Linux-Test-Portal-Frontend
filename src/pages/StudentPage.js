import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import { FaSearch } from "react-icons/fa";

function StudentPage() {
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [students, setStudents] = useState([]); // State for student data
    const [filteredStudents, setFilteredStudents] = useState([]); // Filtered student data

    // Fetch student details on component mount using POST
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/students', {}); // Adjust URL if needed
                console.log('Response Data:', response.data); // Debugging
                setStudents(response.data); // Update state with response data
                setFilteredStudents(response.data); // Initialize filtered data
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudents();
    }, []);

    // Filter students based on search query
    useEffect(() => {
        const filtered = students.filter((student) => {
            return (
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.registernumber.toString().includes(searchQuery) ||
                student.mailid.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setFilteredStudents(filtered);
    }, [searchQuery, students]);

    return (
        <div className="dashboard flex bg-gray-100 min-h-screen">
            <div>
                <Sidebar />
            </div>
            <div className="flex flex-col p-6 w-full lg:w-4/5">
                <h2 className="text-3xl font-bold text-gray-700 mb-8">Student Details</h2>

                {/* Search bar */}
                <div className="flex justify-start p-4">
                    <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-sm px-1.5 py-1">
                        <FaSearch className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="shadow-md overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Level</th>
                                <th scope="col" className="px-6 py-3">Register Number</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Block</th>    
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4">{student.id}</td>
                                        <td className="px-6 py-4">{student.name}</td>
                                        <td className="px-6 py-4">{student.level}</td>
                                        <td className="px-6 py-4">{student.register_number}</td>
                                        <td className="px-6 py-4">{student.mail_id}</td>
                                        <td className="px-6 py-4">
                                          <button
                                            //   onClick={() => toggleBlockStatus(student.id)}
                                              className={`px-4 py-2 rounded text-white ${
                                                  student.block ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                                              }`}
                                          >
                                              {student.block ? 'Blocked' : 'Active'}
                                          </button>
                                      </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No students found
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../components/sidebar";
// import { FaSearch } from "react-icons/fa";

// function StudentPage() {
//     const [searchQuery, setSearchQuery] = useState(""); // State for search query
//     const [students, setStudents] = useState([]); // State for student data
//     const [filteredStudents, setFilteredStudents] = useState([]); // Filtered student data

//     // Fetch student details on component mount using POST
//     useEffect(() => {
//         const fetchStudents = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/students', {}); // Adjust URL if needed
//                 console.log('Response Data:', response.data); // Debugging
//                 setStudents(response.data); // Update state with response data
//                 setFilteredStudents(response.data); // Initialize filtered data
//             } catch (error) {
//                 console.error('Error fetching student data:', error);
//             }
//         };

//         fetchStudents();
//     }, []);

//     // Filter students based on search query
//     useEffect(() => {
//         const filtered = students.filter((student) => {
//             return (
//                 student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 student.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 student.registernumber.toString().includes(searchQuery) ||
//                 student.mailid.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         });
//         setFilteredStudents(filtered);
//     }, [searchQuery, students]);

//     // Toggle block status for a student
//     const toggleBlockStatus = async (id) => {
//         try {
//             const response = await axios.post('http://localhost:4000/api/students/toggleBlock', { id });
//             if (response.data.success) {
//                 setStudents((prevStudents) =>
//                     prevStudents.map((student) =>
//                         student.id === id ? { ...student, block: !student.block } : student
//                     )
//                 );
//             }
//         } catch (error) {
//             console.error('Error toggling block status:', error);
//         }
//     };

//     return (
//         <div className="dashboard flex bg-gray-100 min-h-screen">
//             <div>
//                 <Sidebar />
//             </div>
//             <div className="flex flex-col p-6 w-full lg:w-4/5">
//                 <h2 className="text-3xl font-bold text-gray-700 mb-8">Student Details</h2>

//                 {/* Search bar */}
//                 <div className="flex justify-start p-4">
//                     <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-sm px-1.5 py-1">
//                         <FaSearch className="text-gray-400 mr-3" />
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none"
//                         />
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div className="shadow-md overflow-x-auto sm:rounded-lg">
//                     <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
//                         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3">ID</th>
//                                 <th scope="col" className="px-6 py-3">Name</th>
//                                 <th scope="col" className="px-6 py-3">Level</th>
//                                 <th scope="col" className="px-6 py-3">Register Number</th>
//                                 <th scope="col" className="px-6 py-3">Email</th>
//                                 <th scope="col" className="px-6 py-3">Block</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredStudents.length > 0 ? (
//                                 filteredStudents.map((student) => (
//                                     <tr
//                                         key={student.id}
//                                         className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                                     >
//                                         <td className="px-6 py-4">{student.id}</td>
//                                         <td className="px-6 py-4">{student.name}</td>
//                                         <td className="px-6 py-4">{student.level}</td>
//                                         <td className="px-6 py-4">{student.registernumber}</td>
//                                         <td className="px-6 py-4">{student.mailid}</td>
//                                         <td className="px-6 py-4">
//                                             <button
//                                                 onClick={() => toggleBlockStatus(student.id)}
//                                                 className={`px-4 py-2 rounded text-white ${
//                                                     student.block ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
//                                                 }`}
//                                             >
//                                                 {student.block ? 'Blocked' : 'Active'}
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td
//                                         colSpan="6"
//                                         className="px-6 py-4 text-center text-gray-500"
//                                     >
//                                         No students found
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default StudentPage;
