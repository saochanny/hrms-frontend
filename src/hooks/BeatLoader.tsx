import {BeatLoader} from "react-spinners";

export default function Loading({isLoading}: { isLoading: boolean }) {

    return (
        <>
            {
                isLoading &&
                <div className={'w-screen h-screen fixed z-50 bg-[rgba(0,0,0,0,0)] flex justify-center items-center top-0 left-0'}>
                    <div className={'px-20 py-9 flex justify-center items-center bg-gray-50 shadow-xl rounded-lg'}>
                        <BeatLoader
                            color="#0970e5"
                            loading={isLoading}
                            size={15}
                        />
                    </div>
                </div>
            }
        </>
    )
}