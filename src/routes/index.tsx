import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import {ErrorPage} from "../screen/Error.tsx";
import Leave from "../components/leaves/Leave.tsx";
import Employee from "../components/employees/Employee.tsx";
import Setup from "../components/setup/Setup.tsx";
import Dashboard from "../components/dashboard/Dashboard.tsx";
import Setting from "../components/Setting.tsx";

export const router = createBrowserRouter(
    [{
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Dashboard/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/employees',
                element: <Employee/>,
            },
            {
                path: '/leaves',
                element: <Leave/>,
            }, {
                path: '/setup',
                element: <Setup/>,
            },
            {
                path:'/setting',
                element:<Setting/>,
            },
            {
                path:'/notifications',
                element:<Setting/>,
            },
            {
                path:'/project',
                element:<Setting/>,
            },
            {
                path:'/meeting',
                element:<Setting/>,
            },
            {
                path:'/overtimes',
                element:<Setting/>,
            },
            {
                path:'/documents',
                element:<Setting/>,
            },
            {
                path:'/events',
                element:<Setting/>,
            },
            {
                path:'/users-management',
                element:<Setting/>,
            },
            {
                path:'/al-management',
                element:<Setting/>,
            },
            {
                path:'/contracts',
                element:<Setting/>,
            },
            {
                path:'/account',
                element:<Setting/>,
            }
        ]
    }])