import React from 'react'
import Spinner from './Spinner'

function LoadingScreen({ message }) {
    const tempMessage = {
        message: "Waiting for transaction to confirm",
        hash: "0x89282928292892829829828928292",
        success: null
    }
    return (
        <div className='w-full h-full fixed top-0 left-0'>
            <div className='bg-[#DBDFD9] w-screen h-screen absolute opacity-50'>
            </div>
            <div className="text-xs md:text-base inset-0 z-10 w-full max-w-80 md:max-w-96 h-screen overflow-y-auto flex flex-col justify-center items-center z-10 absolute border-2">
                <div>
                    <div className="p-4 container flex flex-col justify-center items-center w-full mx-auto bg-red-200 rounded-lg shadow dark:bg-gray-800">
                        <div className='loader'></div>
                        <div className='font-sans text-xl font-semibold mt-6'>
                            {message.message}
                        </div>
                        {message.hash && <div className='font-sans text-sm py-2'>
                            Transaction Hash: {message.hash}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen