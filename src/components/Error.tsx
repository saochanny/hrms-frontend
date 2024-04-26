import {NavLink} from "react-router-dom";
import {AiOutlineArrowLeft} from "react-icons/ai";

export function ErrorPage() {
    return (
        <div className='flex flex-col items-center h-screen justify-center gap-4'>
            <h1 className=''>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>{/* <i>{error.statusText || error.message}</i> */}</p>
            <NavLink className='text-blue-500 flex gap-2 items-center' to={'/'}>
                <AiOutlineArrowLeft className='h-4 w-4'/>
                Back
            </NavLink>
        </div>
    );
}