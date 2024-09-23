import './App.css'
import {useAuthentication} from "./hooks/AuthContext.tsx";
import Login from "./components/login/Login.tsx";
import Layout from "./components/layout/Layout.tsx";


function App() {

    const {logined} = useAuthentication();


    return (

        <>

            {!logined ?
                (<Login/>) :
                (<Layout/>)
            }
        </>
    )
}

export default App;
