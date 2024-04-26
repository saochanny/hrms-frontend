import './App.css'
import Dashboard from "./components/Dashboard.tsx";
import Login from "./components/login/Login.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/'} element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
