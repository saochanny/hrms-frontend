import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "./hooks/AuthContext.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {Toaster} from "react-hot-toast";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Toaster/>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
,
)
