import LoginPage from "../pages/LoginPage";
import Mainpage from "../pages/Mainpage";
import BookingPage from "../pages/BookingPage";

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
];

export default routes;