import {HashLoader} from "react-spinners";

export default function Loading({isLoading}: { isLoading: boolean }) {

    return (
        <>
            {
                isLoading &&
                <div className={'w-screen h-screen fixed z-50 bg-white flex justify-center items-center top-0 left-0'}>
                    <HashLoader
                        color="#3890ec"
                        loading={isLoading}
                        size={50}
                    />
                </div>
            }
        </>
    )
}