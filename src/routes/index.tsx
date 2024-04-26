import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import Login from "../components/login/Login.tsx";
import {ErrorPage} from "../components/Error.tsx";

export const router = createBrowserRouter(
    [{
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '',
                element: <App/>
            },
            {
                path: '/login',
                element: <Login/>,
            },
        ]
    }])