import LoginPage from "../pages/LoginPage";
import Mainpage from "../pages/Mainpage";
import BookingPage from "../pages/BookingPage";
import TaskList from "../pages/Testpage";

const routes = [
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/mainpage",
        element: <Mainpage />,
    },
    {
        path: "/booking",
        element: <BookingPage />,
    },
    {
        path: "/test",
        element: <TaskList />,
    },
];

export default routes;