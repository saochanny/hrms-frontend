// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "./hooks/AuthContext.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {Toaster} from "react-hot-toast";
import {PrimeReactProvider} from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';
import {twMerge} from 'tailwind-merge';
import {StyledEngineProvider} from '@mui/material/styles';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <>
        <PrimeReactProvider value={{
            unstyled: true,
            pt: Tailwind,
            ptOptions: {mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge}
        }}>
            <StyledEngineProvider injectFirst>
                <QueryClientProvider client={queryClient}>
                    <Toaster/>
                    <AuthProvider>
                        <RouterProvider router={router}/>
                    </AuthProvider>
                </QueryClientProvider>
            </StyledEngineProvider>
        </PrimeReactProvider>
    </>

    // {/*</React.StrictMode>*/}
    ,
)
