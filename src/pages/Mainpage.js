import TerminalComponent from '../components/Terminal';
import '../Styles/Mainpage.css';
import Headder from "../components/header"
import Footer from '../components/footer';
const Mainpage = ({ handleBack, handleNext }) => {
    return (
        <div>                         
            <Headder/>          
                
            <div className="Content">
                <div className="Task-View">

                    <div className="Task">
                        <div className="Task-Num">
                            {/* {Task} */}
                            Task 1:
                        </div>
                        <div className="Question">
                            {/* {Question} */}
                            <p>
                                You are a system administrator tasked with organizing a project directory for a new team. The directory /home/student/project contains several folders and files that have accumulated over time. The team needs an organized summary of the directory structure to identify how many folders and files are present. Your task is to list the contents of the directory and provide the exact count of folders and files within it.  
                            </p>
                            
                        </div>
                    </div>

                    <div className= "flex justify-between mt-9">
                        <a href="#" className="m-2 inline-flex items-center justify-center rounded-xl border bg-white px-5 py-3 font-medium text-blue-600 shadow hover:bg-blue-50 w-32"> Previous </a>
                        <a href="#" className="m-2 inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 w-32"> Next </a>

                    </div>
                </div>
                <div className="pt-4">
                    <TerminalComponent />
                </div>
            </div >
            <Footer/>
        </div >
    )
}

export default Mainpage;