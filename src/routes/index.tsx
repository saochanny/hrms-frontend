import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import {ErrorPage} from "../screen/Error.tsx";
import Leave from "../components/leaves/Leave.tsx";
import Employee from "../components/employees/Employee.tsx";
import Dashboard from "../components/dashboard/Dashboard.tsx";
import Setting from "../components/Setting.tsx";
import Role from "../components/setup/roles/Role.tsx";
import User from "../components/setup/users/User.tsx";
import CreateUser from "../components/setup/users/CreateUser.tsx";
import UserDetail from "../components/setup/users/UserDetail.tsx";
import EditUser from "../components/setup/users/EditUser.tsx";
import CreatePassword from "../components/create-password/CreatePassword.tsx";


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
                path: 'employees',
                element: <Employee/>,
            },
            {
                path: 'leaves',
                element: <Leave/>,
            },
            {
                path: 'roles',
                element: <Role/>,
            },
            {
                path: 'permissions',
                element: <Role/>,
            },
            {
                path: 'leave-type',
                element: <Role/>,
            },
            {
                path: 'setting',
                element: <Setting/>,
            },
            {
                path: 'notifications',
                element: <Setting/>,
            },
            {
                path: 'project',
                element: <Setting/>,
            },
            {
                path: 'meeting',
                element: <Setting/>,
            },
            {
                path: 'overtimes',
                element: <Setting/>,
            },
            {
                path: 'documents',
                element: <Setting/>,
            },
            {
                path: 'events',
                element: <Setting/>,
            },
            {
                path: 'users-management',
                children: [
                    {
                        index: true,
                        element: <User/>,
                    },
                    {
                        path: 'create',
                        element: <CreateUser/>,
                    },
                    {
                        path: 'detail/:id',
                        element: <UserDetail/>,
                    },
                    {
                        path: 'edit/:id',
                        element: <EditUser/>,
                    },
                ]
            },
            {
                path: 'al-management',
                element: <Setting/>,
            },
            {
                path: 'contracts',
                element: <Setting/>,
            },
            {
                path: 'account',
                element: <Setting/>,
            },
        ]
    },
        {
            path: 'create-password',
            element: <CreatePassword/>
        }
    ])