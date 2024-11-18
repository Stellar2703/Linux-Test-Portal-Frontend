import TerminalComponent from '../components/Terminal';
import '../Styles/Mainpage.css';
import Header from '../components/header';
import Footer from '../components/footer';

const Mainpage = ({ handleBack, handleNext }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Component */}
            <Header />

            {/* Main Content Area (this ensures footer stays at the bottom) */}
            <div className="flex-grow ">
                <div className="Content">
                    {/* Task View Section */}
                    <div className="Task-View w-full">
                        <div className="Task">
                            <div className="Task-Num bg-indigo-300 text-gray-800 font-semibold py-3 px-4 rounded-t-xl">
                                Task 1:
                            </div>
                            <div className="Question bg-white p-4 rounded-b-xl text-gray-700">
                                <p>
                                    You are a system administrator tasked with organizing a project directory for a new team.
                                    The directory <code className="bg-gray-200 px-1 rounded">/home/student/project</code> contains several folders and files that have accumulated over time.
                                    The team needs an organized summary of the directory structure to identify how many folders and files are present.
                                    Your task is to list the contents of the directory and provide the exact count of folders and files within it.
                                </p>
                                {/* Submit Button */}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Section */}
                    <div className="pt-4">
                        <TerminalComponent />
                    </div>
                </div>
            </div>

            {/* Footer Component (Always at the bottom) */}
            <Footer />
        </div>
    );
};

export default Mainpage;
